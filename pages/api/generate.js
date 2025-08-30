import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { brief, role, tone, style } = req.body;

  if (!brief || !role || !tone || !style) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const prompt = `You are an experienced ${role}. Write a ${tone.toLowerCase()}, ${style.toLowerCase()} proposal for the following brief:\n\n${brief}`;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4", // or "gpt-3.5-turbo" if you're using that
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const result = completion.data.choices[0].message.content;
    res.status(200).json({ proposal: result });
  } catch (error) {
    console.error("🔴 Error in OpenAI API:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate proposal" });
  }
}
