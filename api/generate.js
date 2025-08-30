import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { to, from, prompt } = req.body;
  const fullPrompt = `Write a professional freelance proposal from ${from} to ${to}. Include the following: ${prompt}`;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: fullPrompt }],
    });
    res.status(200).json({ result: completion.data.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ result: "Failed to generate proposal." });
  }
}