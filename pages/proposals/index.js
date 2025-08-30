// /pages/proposals/index.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';

export default function ProposalsList() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProposals = async () => {
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching proposals:', error.message);
      } else {
        setProposals(data);
      }

      setLoading(false);
    };

    fetchProposals();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this proposal?');
    if (!confirm) return;

    const res = await fetch(`/api/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    const result = await res.json();

    if (res.ok) {
      setProposals(proposals.filter((p) => p.id !== id));
    } else {
      alert(`Failed to delete: ${result.error}`);
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-800 dark:text-gray-100">Loading proposals...</p>;
  }

  if (proposals.length === 0) {
    return <p className="p-6 text-gray-800 dark:text-gray-100">No proposals found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Your Proposals</h1>
      <ul className="space-y-4">
        {proposals.map((proposal) => (
          <li key={proposal.id} className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{proposal.title || 'Untitled Proposal'}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              To: {proposal.client_name} — From: {proposal.sender_name}
            </p>
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => router.push(`/proposals/${proposal.id}`)}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                View
              </button>
              <button
                onClick={() => router.push(`/proposals/${proposal.id}/edit`)}
                className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(proposal.id)}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
