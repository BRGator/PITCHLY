import { Configuration, OpenAIApi } from "openai";

console.log("API Key Present:", !!process.env.OPENAI_API_KEY);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { brief, role, tone, style } = req.body;

  if (!brief || !role || !tone || !style) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const prompt = `You are an expert proposal writer. Write a concise, persuasive freelance proposal in under 300 words.

Respond to this job brief:

"${brief}"

As a ${role}, using a ${tone} tone and ${style} style.
Make the response personalized, confident, and professional. Do not include placeholders or incomplete thoughts.`;

    const completion = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You generate high-converting freelance job proposals." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 600,
    });

    const proposal = completion.data.choices[0].message.content.trim();
    res.status(200).json({ proposal });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: 'Failed to generate proposal' });
  }
}
