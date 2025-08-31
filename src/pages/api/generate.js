import { OpenAI } from 'openai';
import { getSupabaseClient } from '../../lib/supabase';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabase = getSupabaseClient();

  const { brief, clientName, salutation, senderName, title, user_id } = req.body;

  // Validate input
  if (!brief || !clientName || !salutation || !senderName || !title || !user_id) {
    console.error('🔴 Missing required fields:', req.body);
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const prompt = `
You are an expert freelance designer and marketer. Write a personalized proposal in response to the following brief. Include a proper greeting to "${clientName}" using this salutation style: "${salutation}". Sign off the message using the name: "${senderName}". Make sure the message is persuasive and tailored to the project.

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

    // Store in Supabase
    const { error } = await supabase.from('proposals').insert([
      {
        client_name: clientName,
        salutation: salutation,
        sender_name: senderName,
        title: title,
        content: output,
        user_id: user_id,
      },
    ]);

    if (error) {
      console.error('🔴 Supabase insert error:', error.message);
      return res.status(500).json({ error: 'Failed to store proposal in Supabase' });
    }

    return res.status(200).json({ result: output });
  } catch (err) {
    console.error('🔴 OpenAI error:', err);
    return res.status(500).json({ error: 'Failed to generate proposal' });
  }
}
