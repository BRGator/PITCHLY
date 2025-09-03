import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('OpenAI API key present:', !!process.env.OPENAI_API_KEY);

  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  console.log('User session:', session.user.id);
  
  // Check if user can create proposal (subscription limits)
  const { data: canCreate, error: limitError } = await supabase
    .rpc('can_create_proposal', { p_user_id: session.user.id });
    
  if (limitError) {
    console.error('Error checking limits:', limitError);
    return res.status(500).json({ message: 'Failed to check subscription limits' });
  }
  
  if (!canCreate) {
    // Get subscription info for error message
    const { data: subscription } = await supabase
      .from('user_subscriptions')
      .select('tier, proposals_limit, proposals_used_this_period')
      .eq('user_id', session.user.id)
      .single();
      
    return res.status(403).json({ 
      message: 'Proposal limit reached',
      details: `You've reached your monthly limit of ${subscription?.proposals_limit || 3} proposals. Upgrade to Professional for unlimited proposals.`,
      subscription: subscription,
      upgradeRequired: true
    });
  }

  const { 
    clientName, 
    clientEmail, 
    projectTitle, 
    projectDescription, 
    budgetAmount, 
    budgetUnit, 
    timelineType, 
    timelineDuration, 
    timelineDeadline 
  } = req.body;

  if (!clientName || !projectTitle || !projectDescription || !budgetAmount || !budgetUnit) {
    return res.status(400).json({ message: 'Client name, project title, description, and budget information are required' });
  }

  // Validate timeline based on type
  if (timelineType === 'duration' && !timelineDuration) {
    return res.status(400).json({ message: 'Please specify project duration' });
  }
  
  if (timelineType === 'deadline' && !timelineDeadline) {
    return res.status(400).json({ message: 'Please specify project deadline' });
  }

  try {
    // Get user information for personalization
    const { data: userData } = await supabase
      .from('users')
      .select('name, email')
      .eq('id', session.user.id)
      .single();

    const { data: userSettings } = await supabase
      .from('user_settings')
      .select('company_name, business_type')
      .eq('user_id', session.user.id)
      .single();

    // Format budget and timeline information
    const formatBudget = () => {
      const amount = parseFloat(budgetAmount);
      const formattedAmount = amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      });
      
      const unitLabels = {
        'lump-sum': 'Total Project',
        'per-hour': 'per hour',
        'per-day': 'per day',
        'per-week': 'per week',
        'per-month': 'per month',
        'per-deliverable': 'per deliverable',
        'per-milestone': 'per milestone',
        'retainer': 'monthly retainer'
      };
      
      return `${formattedAmount} ${unitLabels[budgetUnit] || budgetUnit}`;
    };

    const formatTimeline = () => {
      if (timelineType === 'deadline') {
        const deadlineDate = new Date(timelineDeadline);
        const today = new Date();
        const timeDiff = deadlineDate.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        return `Deadline: ${deadlineDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })} (${daysDiff} days from today)`;
      } else {
        const durationLabels = {
          '1-week': '1 week',
          '2-weeks': '2 weeks', 
          '3-weeks': '3 weeks',
          '1-month': '1 month',
          '6-weeks': '6 weeks',
          '2-months': '2 months',
          '3-months': '3 months',
          '4-months': '4 months', 
          '6-months': '6 months',
          '12-months': '12 months',
          'ongoing': 'Ongoing engagement'
        };
        return `Duration: ${durationLabels[timelineDuration] || timelineDuration}`;
      }
    };

    // Construct the AI prompt
    const prompt = `You are a professional proposal writer helping ${userData?.name || 'a business owner'} ${userSettings?.company_name ? `from ${userSettings?.company_name}` : ''} create a winning business proposal.

Create a comprehensive, persuasive proposal for the following project:

**CLIENT INFORMATION:**
- Client Name: ${clientName}
- Contact: ${clientEmail || 'To be provided'}

**PROJECT DETAILS:**
- Project Title: ${projectTitle}
- Description: ${projectDescription}
- Budget: ${formatBudget()}
- Timeline: ${formatTimeline()}

**YOUR BUSINESS:**
- Your Name: ${userData?.name || '[Your Name]'}
- Company: ${userSettings?.company_name || '[Your Company]'}
- Business Type: ${userSettings?.business_type || 'Service Provider'}

**PRICING CONTEXT:**
- Budget is ${formatBudget()}
- ${budgetUnit === 'lump-sum' ? 'This is the total project investment' : 'This is the rate structure for ongoing work'}
- ${budgetUnit.includes('per-') ? 'Ensure the proposal explains what is included in each unit of work' : ''}

**TIMELINE CONTEXT:**
- ${formatTimeline()}
- ${timelineType === 'deadline' ? 'This is a firm deadline - structure milestones to ensure on-time delivery' : 'This is the expected project duration - break into phases'}
- Plan deliverables and milestones that align with this timeline

**INSTRUCTIONS:**
Generate a professional, persuasive proposal that includes:

1. **Executive Summary** - Brief overview highlighting key value propositions and investment summary
2. **Project Understanding** - Demonstrate deep understanding of client's needs and timeline requirements
3. **Proposed Solution** - Detailed approach, methodology, and specific deliverables
4. **Timeline & Milestones** - ${timelineType === 'deadline' ? 'Detailed project schedule leading to the specified deadline' : 'Clear project phases based on the specified duration'}
5. **Investment & Pricing** - Clear breakdown of the ${formatBudget()} investment and what it includes
6. **Payment Terms** - Appropriate payment schedule based on the ${budgetUnit} structure
7. **Why Choose Us** - Unique qualifications and competitive advantages
8. **Next Steps** - Clear call-to-action for moving forward

**PRICING REQUIREMENTS:**
- Clearly present the ${formatBudget()} investment
- ${budgetUnit === 'lump-sum' ? 'Break down what is included in the total project cost' : `Explain exactly what is delivered for each ${budgetUnit.replace('per-', '')} payment`}
- Justify the value and ROI of this investment
- Include professional payment terms

**TIMELINE REQUIREMENTS:**
- ${timelineType === 'deadline' ? `Work backwards from the ${timelineDeadline} deadline to create realistic milestones` : `Structure the work into logical phases over the ${timelineDuration} timeframe`}
- Include buffer time for revisions and client feedback
- Specify key deliverables and review points

**TONE & STYLE:**
- Professional yet approachable
- Confident but not arrogant  
- Focus on client benefits and outcomes
- Use persuasive language that builds trust
- Include specific details that show expertise
- Address potential concerns about budget and timeline proactively

**FORMAT:**
Structure as a formal business proposal with clear headers and professional formatting. Make it compelling enough that the client feels confident moving forward with this partnership.

Generate a complete, ready-to-send proposal:`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert business proposal writer with 20+ years of experience helping businesses win high-value contracts. Your proposals consistently achieve 80%+ win rates by focusing on client value, clear communication, and professional presentation."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 3000,
      temperature: 0.7,
    });

    const generatedProposal = completion.choices[0].message.content;

    // Save the proposal to database
    console.log('Attempting to save proposal for user:', session.user.id);
    
    const proposalData = {
      user_id: session.user.id,
      title: projectTitle,
      client_name: clientName,
      content: generatedProposal,
      status: 'draft',
      project_description: projectDescription,
      budget_amount: parseFloat(budgetAmount),
      budget_unit: budgetUnit,
      timeline_type: timelineType,
      timeline_duration: timelineType === 'duration' ? timelineDuration : null,
      timeline_deadline: timelineType === 'deadline' ? timelineDeadline : null
    };
    
    // Add optional fields if provided
    if (clientEmail) proposalData.client_email = clientEmail;
    
    const { data: savedProposal, error: saveError } = await supabase
      .from('proposals')
      .insert(proposalData)
      .select()
      .single();

    if (saveError) {
      console.error('Database save error:', saveError);
      return res.status(500).json({
        message: 'Failed to save proposal to database',
        error: process.env.NODE_ENV === 'development' ? saveError.message : 'Database error'
      });
    }

    console.log('Proposal saved successfully:', savedProposal?.id);
    
    // Update usage count using RPC function
    await supabase.rpc('increment_proposal_usage', { p_user_id: session.user.id });
      
    // Track usage for analytics
    await supabase
      .from('proposal_usage')
      .insert({
        user_id: session.user.id,
        proposal_id: savedProposal?.id,
        action: 'created'
      });

    res.status(200).json({
      success: true,
      proposal: {
        id: savedProposal?.id,
        title: projectTitle,
        content: generatedProposal,
        client_name: clientName,
        created_at: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('API error:', error);
    
    if (error.code === 'insufficient_quota') {
      return res.status(402).json({ 
        message: 'OpenAI API quota exceeded. Please check your billing settings.' 
      });
    }
    
    res.status(500).json({ 
      message: 'Failed to generate proposal. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}