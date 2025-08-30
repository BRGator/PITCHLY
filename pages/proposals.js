// pages/proposals.js

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function ProposalsPage() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  // TEMP: Use hardcoded user_id (same as ProposalForm)
  const userId = 'abc-123';

  useEffect(() => {
    const fetchProposals = async () => {
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('🔴 Failed to fetch proposals:', error.message);
      } else {
        setProposals(data);
      }

      setLoading(false);
    };

    fetchProposals();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">Your Saved Proposals</h1>

      {loading ? (
        <p>Loading...</p>
      ) : proposals.length === 0 ? (
        <p>No proposals found.</p>
      ) : (
        <div className="space-y-4">
          {proposals.map((p) => (
            <div
              key={p.id}
              className="p-4 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 shadow-sm"
            >
              <h2 className="text-xl font-semibold">{p.title || 'Untitled Proposal'}</h2>
              <p className="text-sm text-gray-500 mb-2">To: {p.client_name}</p>
              <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                {p.content.length > 300
                  ? `${p.content.slice(0, 300)}...`
                  : p.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}