// pages/dashboard.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProposals = async () => {
      const {
        data: { session },
        error: sessionError
      } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        router.push('/auth/signin');
        return;
      }

      setUser(session.user);

      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .eq('user_id', session.user.id)
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

  if (loading) {
    return <div className="p-6 text-gray-900 dark:text-gray-100">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">Your Proposals</h1>

      {proposals.length === 0 ? (
        <p>You haven't generated any proposals yet.</p>
      ) : (
        <ul className="space-y-4">
          {proposals.map((proposal) => (
            <li
              key={proposal.id}
              className="p-4 bg-white dark:bg-gray-800 rounded shadow border border-gray-300 dark:border-gray-700"
            >
              <h2 className="text-lg font-semibold">{proposal.title || 'Untitled Proposal'}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {new Date(proposal.created_at).toLocaleString()}
              </p>
              <Link
                href={`/proposals/${proposal.id}`}
                className="text-blue-600 hover:underline block mt-2"
              >
                View Full Proposal →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}