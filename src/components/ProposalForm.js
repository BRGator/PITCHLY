import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function ProposalForm() {
  const { data: session } = useSession();
  const [clientName, setClientName] = useState('');
  const [salutation, setSalutation] = useState('Best regards');
  const [senderName, setSenderName] = useState('');
  const [title, setTitle] = useState('');
  const [brief, setBrief] = useState('');
  const [proposal, setProposal] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProposal('');
    setError('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          salutation,
          senderName,
          title: title || `Proposal for ${clientName}`,
          brief,
          user_id: session?.user?.id || 'demo-user',
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setProposal(data.result);
      } else {
        throw new Error(data.error || 'An error occurred');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(proposal);
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const exampleBrief = "We're a boutique coffee shop looking to establish a stronger online presence. Our target customers are young professionals and coffee enthusiasts who value quality and convenience. We'd like a website that showcases our artisanal brand, displays our menu with pricing, includes our location and hours, and allows customers to place orders for pickup. We prefer a clean, modern aesthetic that reflects our premium coffee experience. Our budget is flexible for the right solution, and we're hoping to launch within 6-8 weeks.";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          <div className="text-center lg:text-left mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Create Your Winning Proposal
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Fill in the details below and let our AI craft a compelling proposal for you.
            </p>
          </div>

          <form onSubmit={handleGenerate} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="input-field"
                  placeholder="e.g., Sarah Johnson"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="input-field"
                  placeholder="e.g., Alex Smith"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Closing Salutation *
                </label>
                <select
                  value={salutation}
                  onChange={(e) => setSalutation(e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="Best regards">Best regards</option>
                  <option value="Warm regards">Warm regards</option>
                  <option value="Sincerely">Sincerely</option>
                  <option value="Kind regards">Kind regards</option>
                  <option value="Looking forward to working together">Looking forward to working together</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Proposal Title (Optional)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-field"
                  placeholder="Auto-generated if left blank"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Project Brief / Description *
              </label>
              <textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                rows={6}
                className="input-field"
                placeholder={exampleBrief}
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Be specific about the project requirements, timeline, and any special considerations.
              </p>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`btn-primary w-full ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating your proposal<span className="loading-dots"></span>
                </span>
              ) : (
                '✨ Generate My Winning Proposal'
              )}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {proposal ? (
            <div className="card-premium p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Your Professional Proposal</h3>
                <button
                  onClick={handleCopy}
                  className="btn-ghost text-sm"
                  title="Copy to clipboard"
                >
                  <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </button>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap border border-gray-200 dark:border-gray-700">
                  {proposal}
                </div>
              </div>
            </div>
          ) : (
            <div className="card p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-2xl transform hover:scale-110 transition-all duration-500 animate-pulse-subtle">
                <div className="w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                  <svg className="w-9 h-9 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6V4m6 2l-1.5 1.5M16 12h2m-2 4l1.5 1.5M12 18v2m-6-2l1.5-1.5M8 12H6m2-4L6.5 6.5" />
                    <circle cx="12" cy="12" r="4" strokeWidth={2} fill="currentColor" opacity="0.3" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Ready to Win Your Next Client?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Fill out the form and watch our AI create a compelling, personalized proposal that gets results.
              </p>
              <div className="text-left space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Personalized to your client's needs
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Professional tone and structure
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Optimized for conversion
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
