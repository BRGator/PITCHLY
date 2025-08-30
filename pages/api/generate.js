import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt, role, tone, style } = req.body;

  if (!prompt || !process.env.OPENAI_API_KEY) {
    return res.status(400).json({ error: "Missing prompt or API key" });
  }

  try {
    console.log("🟡 Incoming prompt:", prompt);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert freelance proposal writer. Format proposals clearly with:
- A short attention-grabbing intro
- 2–4 bullet points of deliverables
- A closing paragraph to inspire confidence

Tone: ${tone || "professional"}  
Style: ${style || "clear and concise"}  
Perspective: ${role || "general freelancer"}`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const message = completion.choices?.[0]?.message?.content || "No response";
    console.log("🟢 Generated message:", message);

    return res.status(200).json({ result: message });

  } catch (error) {
    console.error("🔴 OpenAI API error:", error);
    return res.status(500).json({ error: "Generation failed. Try again later." });
  }
}
