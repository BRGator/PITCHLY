import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/generate", { to, from, prompt });
      setResult(res.data.result);
    } catch (err) {
      console.error(err);
      setResult("Error generating proposal.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Pitchly Proposal Generator</h1>
      <div className="w-full max-w-xl space-y-4">
        <input className="w-full p-2 rounded border" placeholder="To (Client)" value={to} onChange={e => setTo(e.target.value)} />
        <input className="w-full p-2 rounded border" placeholder="From (You / Your Brand)" value={from} onChange={e => setFrom(e.target.value)} />
        <textarea className="w-full p-2 rounded border" placeholder="Describe what the proposal should include..." value={prompt} onChange={e => setPrompt(e.target.value)} rows="4" />
        <button onClick={generate} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? "Generating..." : "Generate Proposal"}</button>
        {result && <div className="mt-4 p-4 border rounded bg-gray-100 dark:bg-gray-800 whitespace-pre-wrap">{result}</div>}
      </div>
    </main>
  );
}