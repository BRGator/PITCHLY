// pages/proposals/[id].js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSupabaseClient } from '../../lib/supabase';

export async function getServerSideProps(context) {
  const supabase = getSupabaseClient();
  const { id } = context.params;

  const { data, error } = await supabase.from('proposals').select('*').eq('id', id).single();

  if (error || !data) {
    return { notFound: true };
  }

  return { props: { proposal: data } };
}

export default function ProposalDetail({ proposal }) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this proposal?')) return;
    setDeleting(true);

    const supabase = getSupabaseClient();
    const { error } = await supabase.from('proposals').delete().eq('id', proposal.id);

    if (!error) {
      router.push('/proposals');
    } else {
      alert('Failed to delete proposal.');
    }
    setDeleting(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-900 dark:text-gray-100">
      <Link href="/proposals" className="text-blue-600 hover:underline">← Back to proposals</Link>
      <h1 className="text-2xl font-bold mt-4 mb-2">{proposal.title || 'Untitled Proposal'}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        To <strong>{proposal.client_name}</strong> · Sent on {new Date(proposal.created_at).toLocaleString()}
      </p>
      <pre className="whitespace-pre-wrap bg-gray-100 dark:bg-gray-800 p-4 rounded border border-gray-300 dark:border-gray-700">
        {proposal.content}
      </pre>

      <button
        onClick={handleDelete}
        disabled={deleting}
        className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
      >
        {deleting ? 'Deleting...' : 'Delete Proposal'}
      </button>
    </div>
  );
}