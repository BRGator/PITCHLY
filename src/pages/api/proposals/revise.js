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

  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { 
    originalProposalId, 
    originalContent, 
    revisionRequest, 
    originalTitle, 
    clientName 
  } = req.body;

  if (!originalContent || !revisionRequest) {
    return res.status(400).json({ message: 'Original content and revision request are required' });
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

    // Get the original proposal to understand revision history
    const { data: originalProposal } = await supabase
      .from('proposals')
      .select('*')
      .eq('id', originalProposalId)
      .single();

    // Create revision prompt
    const prompt = `You are a professional proposal writer helping ${userData?.name || 'a business owner'} revise an existing business proposal.

**ORIGINAL PROPOSAL:**
${originalContent}

**REVISION REQUEST:**
${revisionRequest}

**CLIENT:** ${clientName}
**YOUR BUSINESS:** ${userSettings?.company_name || '[Your Company]'}

**INSTRUCTIONS:**
1. Take the original proposal as your starting point
2. Make the specific changes requested by the user
3. Maintain the professional tone and structure
4. Keep all the good elements from the original
5. Ensure the revised proposal flows naturally
6. If the request is unclear, make reasonable improvements in that direction

**IMPORTANT:** 
- Generate a COMPLETE revised proposal, not just the changes
- Maintain professional formatting with clear headers
- Keep the proposal comprehensive and ready to send
- Focus on the specific improvements requested

Generate the complete revised proposal:`;

    console.log('Generating proposal revision with OpenAI...');
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert business proposal writer specializing in revisions and improvements. You understand how to take feedback and create polished, professional proposals that address specific client needs."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 3000,
      temperature: 0.7,
    });

    const revisedProposal = completion.choices[0].message.content;

    // Determine revision number
    const { data: existingRevisions } = await supabase
      .from('proposals')
      .select('title')
      .eq('user_id', session.user.id)
      .ilike('title', `${originalTitle}%`);

    const revisionNumber = existingRevisions ? existingRevisions.length : 1;
    const newTitle = `${originalTitle} (Rev ${revisionNumber})`;

    // Save the revised proposal
    console.log('Saving revised proposal for user:', session.user.id);
    
    const proposalData = {
      user_id: session.user.id,
      title: newTitle,
      client_name: clientName,
      content: revisedProposal,
      status: 'revision',
      original_proposal_id: originalProposalId,
      revision_notes: revisionRequest
    };

    const { data: savedProposal, error: saveError } = await supabase
      .from('proposals')
      .insert(proposalData)
      .select()
      .single();

    if (saveError) {
      console.error('Database save error:', saveError);
      return res.status(500).json({
        message: 'Failed to save revised proposal',
        error: process.env.NODE_ENV === 'development' ? saveError.message : 'Database error'
      });
    }

    console.log('Proposal revision saved successfully:', savedProposal?.id);

    res.status(200).json({
      success: true,
      proposal: {
        id: savedProposal?.id,
        title: newTitle,
        content: revisedProposal,
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
      message: 'Failed to generate revision. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}