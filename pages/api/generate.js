import OpenAI from 'openai';

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

  const prompt = `You are an experienced ${role}. Write a ${tone.toLowerCase()}, ${style.toLowerCase()} proposal for the following brief:\n\n${brief}`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const result = completion.choices[0].message.content;
    res.status(200).json({ proposal: result });
  } catch (error) {
    console.error("🔴 OpenAI error:", error);
    res.status(500).json({ error: 'Failed to generate proposal' });
  }
}
