// pages/proposals.js

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';

export default function ProposalsPage() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching proposals:', error.message);
      } else {
        setProposals(data);
      }
      setLoading(false);
    };

    fetchProposals();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">Saved Proposals</h1>
      {loading ? (
        <p>Loading...</p>
      ) : proposals.length === 0 ? (
        <p>No proposals yet.</p>
      ) : (
        <div className="space-y-6">
          {proposals.map((p) => (
            <div
              key={p.id}
              className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold mb-1">{p.title || 'Untitled Proposal'}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    To: <strong>{p.client_name}</strong> — {new Date(p.created_at).toLocaleString()}
                  </p>
                </div>
                <Link
                  href={`/proposals/${p.id}`}
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  View ➔
                </Link>
              </div>
              <p className="mt-4 whitespace-pre-line text-sm">
                {p.content.slice(0, 200)}...
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
