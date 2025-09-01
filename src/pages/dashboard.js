// pages/dashboard.js

import { useEffect, useState } from 'react';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [originalProposalIds, setOriginalProposalIds] = useState(new Set());

  useEffect(() => {
    const fetchProposals = async () => {
      if (status === 'loading') return;
      
      if (status === 'unauthenticated') {
        router.push('/auth/signin');
        return;
      }
      
      if (!session?.user) return;

      // Check user name directly from database (in case session is stale)
      const { data: userData } = await supabase
        .from('users')
        .select('name')
        .eq('id', session.user.id)
        .single();

      // Redirect to onboarding if user has no name (check both session and database)
      if ((!session.user.name || session.user.name.trim() === '') && (!userData?.name || userData.name.trim() === '')) {
        router.push('/onboarding');
        return;
      }


      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching proposals:', error.message);
      } else {
        setProposals(data);
        
        // Find which proposals have revisions (to mark them as "original")
        const originalIds = new Set();
        data.forEach(proposal => {
          if (proposal.original_proposal_id) {
            originalIds.add(proposal.original_proposal_id);
          }
        });
        setOriginalProposalIds(originalIds);
      }

      setLoading(false);
    };

    fetchProposals();
  }, [session, status]);

  if (status === 'loading' || loading) {
    return <div className="p-6 text-gray-900 dark:text-gray-100">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Dashboard - PITCHLY</title>
        <meta name="description" content="Manage your AI-powered proposals and grow your business" />
      </Head>

      <Navbar />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
        <div className="max-w-4xl mx-auto p-6 text-gray-900 dark:text-gray-100">
        {/* Dashboard Actions Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6 sticky top-20 z-40">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Your Proposals
            </h2>
            <Link 
              href="/proposals/new" 
              className="btn-primary"
            >
              ✨ Create New Proposal
            </Link>
          </div>
        </div>
        
        {/* Welcome Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-600 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
              {session.user.name ? 
                session.user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 
                session.user.email[0].toUpperCase()
              }
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                Welcome back{session.user.name ? `, ${session.user.name}` : ''}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">{session.user.email}</p>
            </div>
          </div>
        </div>

        {/* Proposals Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">

          {proposals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You haven't generated any proposals yet.
              </p>
              <Link 
                href="/proposals/new" 
                className="btn-primary inline-block"
              >
                ✨ Create Your First Proposal
              </Link>
            </div>
          ) : (
        <ul className="space-y-4">
          {proposals.map((proposal) => (
            <li
              key={proposal.id}
              className="p-4 bg-white dark:bg-gray-800 rounded shadow border border-gray-300 dark:border-gray-700"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{proposal.title || 'Untitled Proposal'}</h2>
                  {proposal.client_name && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Client: {proposal.client_name}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(proposal.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  {proposal.status === 'revision' && (
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                      Revision
                    </span>
                  )}
                  {originalProposalIds.has(proposal.id) && (
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs">
                      Original
                    </span>
                  )}
                  {proposal.status === 'draft' && !originalProposalIds.has(proposal.id) && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs">
                      Draft
                    </span>
                  )}
                  {proposal.status === 'viewed' && !originalProposalIds.has(proposal.id) && proposal.status !== 'revision' && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs">
                      Viewed
                    </span>
                  )}
                </div>
              </div>
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
        </div>
      </div>
    </>
  );
}

// Removed getServerSideProps to avoid timing issues with magic link authentication
// Dashboard will handle authentication client-side like the homepage does