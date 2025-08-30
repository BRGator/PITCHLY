// pages/proposals/index.js

import Link from 'next/link';
import { getSupabaseClient } from '../../lib/supabase';

export async function getServerSideProps() {
  const supabase = getSupabaseClient();
  const { data: proposals, error } = await supabase
    .from('proposals')
    .select('id, client_name, title, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('🔴 Error fetching proposals:', error.message);
    return { props: { proposals: [] } };
  }

  return { props: { proposals } };
}

export default function ProposalsList({ proposals }) {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        📁 Proposal History
      </h1>

      {proposals.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No proposals found.</p>
      ) : (
        <ul className="space-y-4">
          {proposals.map((proposal) => (
            <li
              key={proposal.id}
              className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <Link href={`/proposals/${proposal.id}`}>
                <div className="cursor-pointer">
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    {proposal.title || 'Untitled Proposal'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    To: {proposal.client_name} · {new Date(proposal.created_at).toLocaleString()}
                  </p>
                </div>
              </Link>
              <div className="mt-2 text-sm">
                <Link href={`/proposals/${proposal.id}/edit`}>
                  <span className="text-blue-500 hover:underline mr-4">✏️ Edit</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}