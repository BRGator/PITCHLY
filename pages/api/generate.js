import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { brief, role, tone, style } = req.body;

  if (!brief || !role || !tone || !style) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an expert freelance proposal writer. You write concise, personalized, and persuasive proposals for freelance clients. Your tone is ${tone.toLowerCase()} and your writing style is ${style.toLowerCase()}.`,
        },
        {
          role: 'user',
          content: `Write a proposal for this project, as a ${role.toLowerCase()}:\n\n${brief}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 400,
    });

    const proposal = completion.choices[0].message.content;
    res.status(200).json({ proposal });
  } catch (err) {
    console.error('🔴 OpenAI error:', err);
    res.status(500).json({ error: 'Failed to generate proposal' });
  }
}
