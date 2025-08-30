// pages/proposals/[id].js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function ProposalView() {
  const router = useRouter();
  const { id } = router.query;

  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProposal = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        router.push('/auth/signin');
        return;
      }

      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .eq('id', id)
        .eq('user_id', session.user.id)
        .single();

      if (error || !data) {
        console.error('Proposal not found or access denied');
        router.push('/dashboard');
      } else {
        setProposal(data);
      }

      setLoading(false);
    };

    fetchProposal();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-gray-900 dark:text-gray-100">Loading...</div>;
  }

  if (!proposal) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">{proposal.title || 'Untitled Proposal'}</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Sent to: <strong>{proposal.client_name}</strong> •{' '}
        {new Date(proposal.created_at).toLocaleString()}
      </p>
      <div className="p-4 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 whitespace-pre-wrap">
        {proposal.content}
      </div>
    </div>
  );
}
