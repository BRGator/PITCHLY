import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';

export default function ProposalsList() {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    const { data, error } = await supabase.from('proposals').select('*').order('created_at', { ascending: false });
    if (!error) setProposals(data);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this proposal?')) return;

    const res = await fetch('/api/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setProposals((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert('Failed to delete proposal.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Saved Proposals</h1>
      <ul className="space-y-4">
        {proposals.map((proposal) => (
          <li key={proposal.id} className="border p-4 rounded-md bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold">{proposal.title || '(Untitled Proposal)'}</h2>
            <p className="text-sm text-gray-500">To: {proposal.client_name}</p>
            <div className="flex gap-4 mt-2">
              <Link
                href={`/proposals/${proposal.id}`}
                className="text-blue-600 hover:underline"
              >
                View
              </Link>
              <Link
                href={`/proposals/${proposal.id}/edit`}
                className="text-green-600 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(proposal.id)}
                className="text-red-600 hover:underline"
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
