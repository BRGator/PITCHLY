import { OpenAI } from 'openai';
import { getSupabaseClient } from '../../lib/supabase';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { brief, clientName, salutation, userName, senderName, title } = req.body;

    console.log('📥 Incoming request body:', { brief, clientName, salutation, userName, senderName, title });

    if (!brief || !clientName || !salutation || !userName || !senderName) {
      console.error('🔴 Missing required fields:', {
        brief, clientName, salutation, userName, senderName,
      });
      return res.status(400).json({
        error: 'Missing required fields',
        details: { brief, clientName, salutation, userName, senderName },
      });
    }

    // Step 1: Generate proposal using OpenAI
    const prompt = `
You are an expert freelance designer and marketer. Write a personalized proposal in response to the following brief. Include a proper greeting to "${clientName}" using this salutation style: "${salutation}". Sign off the message using the name: "${userName}". Make sure the message is persuasive and tailored to the project.

Brief:
${brief}
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a professional freelance designer writing client proposals.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 700,
    });

    const output = completion.choices[0].message.content;

    // Step 2: Store in Supabase
    const supabase = getSupabaseClient();

    const { error } = await supabase.from('proposals').insert([
      {
        client_name: clientName,
        salutation: salutation,
        sender_name: senderName,
        title: title || null,
        content: output,
      },
    ]);

    if (error) {
      console.error('🔴 Supabase insert error:', error.message);
      return res.status(500).json({ error: 'Failed to store proposal in Supabase' });
    }

    // Step 3: Return to frontend
    return res.status(200).json({ result: output });

  } catch (err) {
    console.error('🔴 OpenAI or Server Error:', err);
    return res.status(500).json({ error: 'Failed to generate proposal' });
  }
}
