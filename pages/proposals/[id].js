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
    <h1 className="text-2xl font-bold mb-4">{proposal.title || 'Untitled Proposal'}</h1>

    <p className="mb-2"><strong>To:</strong> {proposal.client_name}</p>
    <p className="mb-2"><strong>Salutation:</strong> {proposal.salutation}</p>
    <p className="mb-2"><strong>From:</strong> {proposal.sender_name}</p>

    <hr className="my-4 border-gray-300 dark:border-gray-600" />

    <pre className="whitespace-pre-wrap mb-6 text-sm bg-gray-100 dark:bg-gray-800 p-4 rounded border border-gray-300 dark:border-gray-700">
      {proposal.content}
    </pre>

    <div className="flex justify-end">
      <Link href={`/proposals/${proposal.id}/edit`}>
        <a className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded">
          ✏️ Edit Proposal
        </a>
      </Link>
    </div>
  </div>
);
}
