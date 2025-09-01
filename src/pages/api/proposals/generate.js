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

  const { clientName, clientEmail, projectTitle, projectDescription, budget, timeline } = req.body;

  if (!clientName || !projectTitle || !projectDescription) {
    return res.status(400).json({ message: 'Client name, project title, and description are required' });
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

    // Construct the AI prompt
    const prompt = `You are a professional proposal writer helping ${userData?.name || 'a business owner'} ${userSettings?.company_name ? `from ${userSettings?.company_name}` : ''} create a winning business proposal.

Create a comprehensive, persuasive proposal for the following project:

**CLIENT INFORMATION:**
- Client Name: ${clientName}
- Contact: ${clientEmail || 'To be provided'}

**PROJECT DETAILS:**
- Project Title: ${projectTitle}
- Description: ${projectDescription}
- Budget Range: ${budget || 'To be discussed'}
- Timeline: ${timeline || 'To be discussed'}

**YOUR BUSINESS:**
- Your Name: ${userData?.name || '[Your Name]'}
- Company: ${userSettings?.company_name || '[Your Company]'}
- Business Type: ${userSettings?.business_type || 'Service Provider'}

**INSTRUCTIONS:**
Generate a professional, persuasive proposal that includes:

1. **Executive Summary** - Brief overview highlighting key value propositions
2. **Project Understanding** - Demonstrate deep understanding of client's needs
3. **Proposed Solution** - Detailed approach, methodology, and deliverables
4. **Timeline & Milestones** - Clear project phases and deadlines
5. **Investment & Value** - Pricing structure and ROI justification
6. **Why Choose Us** - Unique qualifications and competitive advantages
7. **Next Steps** - Clear call-to-action for moving forward

**TONE & STYLE:**
- Professional yet approachable
- Confident but not arrogant
- Focus on client benefits and outcomes
- Use persuasive language that builds trust
- Include specific details that show expertise
- Address potential concerns proactively

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
      status: 'draft'
    };
    
    // Add optional fields if provided
    if (clientEmail) proposalData.client_email = clientEmail;
    if (projectDescription) proposalData.project_description = projectDescription;
    if (budget) proposalData.budget_range = budget;
    if (timeline) proposalData.timeline = timeline;
    
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