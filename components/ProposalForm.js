import { useState } from 'react';

export default function ProposalForm() {
  const [clientName, setClientName] = useState('');
  const [salutation, setSalutation] = useState('Warm regards');
  const [senderName, setSenderName] = useState('');
  const [title, setTitle] = useState('');
  const [brief, setBrief] = useState('');
  const [proposal, setProposal] = useState('');
  const [loading, setLoading] = useState(false);

  // 🔧 TEMP: Hardcoded user ID for now
  const userId = 'abc-123'; // Replace with real value from Supabase Auth later

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProposal('');

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientName,
        salutation,
        senderName,
        title,
        brief,
        user_id: userId, // ✅ Include user_id
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setProposal(data.result); // ✅ backend now returns { result }
    } else {
      alert(data.error || 'An error occurred');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-900 dark:text-gray-100">
      <form onSubmit={handleGenerate} className="space-y-6">
        {/* ... all the fields remain unchanged ... */}
        <div>
          <label className="block font-medium">To (Client Name)</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full p-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Salutation (e.g., “Warm regards”)</label>
          <input
            type="text"
            value={salutation}
            onChange={(e) => setSalutation(e.target.value)}
            className="w-full p-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block font-medium">From (Your Name)</label>
          <input
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="w-full p-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Proposal Title (Optional)</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          />
        </div>

        <div>
          <label className="block font-medium">Brief / Project Description</label>
          <textarea
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            rows={5}
            className="w-full p-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Proposal'}
        </button>
      </form>

      {proposal && (
        <div className="mt-8 p-4 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
          <h3 className="font-bold text-lg mb-2">Your Proposal:</h3>
          <pre className="whitespace-pre-wrap">{proposal}</pre>
        </div>
      )}
    </div>
  );
}
