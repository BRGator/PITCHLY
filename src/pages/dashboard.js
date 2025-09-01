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

  useEffect(() => {
    const fetchProposals = async () => {
      console.log('Dashboard - Session status:', status);
      console.log('Dashboard - Session data:', session);
      
      if (status === 'loading') return;
      
      if (!session?.user) {
        console.log('Dashboard - No session user, redirecting to signin');
        router.push('/auth/signin');
        return;
      }

      console.log('Dashboard - User ID:', session.user.id);

      // Check if user needs onboarding (new users or incomplete profiles)
      const { data: userSettings, error: settingsError } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      // If no user settings exist and user has minimal profile info, redirect to onboarding
      if (settingsError?.code === 'PGRST116' || (!userSettings && (!session.user.name || session.user.name.trim() === ''))) {
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
          <h2 className="text-xl font-bold mb-6">Your Proposals</h2>

          {proposals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You haven't generated any proposals yet.
              </p>
              <Link 
                href="/proposals/new" 
                className="btn-primary inline-block"
              >
                Create Your First Proposal
              </Link>
            </div>
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
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}