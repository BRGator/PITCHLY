// /pages/proposals/index.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { supabase } from '../../lib/supabase';
import { useI18n } from '../../lib/i18n';

export default function ProposalsList() {
  const { t } = useI18n();
  const { data: session, status } = useSession();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProposals = async () => {
      // Check authentication first
      if (status === 'loading') return;
      
      if (status === 'unauthenticated') {
        router.push('/auth/signin');
        return;
      }
      
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .eq('user_id', session.user.id) // CRITICAL: Filter by current user only
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching proposals:', error.message);
      } else {
        setProposals(data);
      }

      setLoading(false);
    };

    fetchProposals();
  }, [session, status, router]);

  const handleDelete = async (id) => {
    const confirm = window.confirm(t('proposalsList.confirmDelete'));
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
      alert(`${t('proposalsList.deleteFailed')}: ${result.error}`);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <>
        <Head>
          <title>{t('proposalsList.pageTitle')} - PITCHLY</title>
        </Head>
        <Navbar />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
          <div className="max-w-4xl mx-auto p-6">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">{t('proposalsList.loadingProposals')}</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{t('proposalsList.pageTitle')} - PITCHLY</title>
        <meta name="description" content={t('proposalsList.pageDescription')} />
      </Head>

      <Navbar />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
        <div className="max-w-4xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <Link href="/dashboard" className="btn-ghost">
                ← {t('proposalsList.backToDashboard')}
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {t('proposalsList.yourProposals')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('proposalsList.manageProposals')}
            </p>
          </div>

          {proposals.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {t('proposalsList.noProposalsFound')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {t('proposalsList.noProposalsDesc')}
              </p>
              <Link href="/proposals/new" className="btn-primary">
                ✨ {t('proposalsList.createFirst')}
              </Link>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {t('proposalsList.allProposals')} ({proposals.length})
                </h2>
                <Link href="/proposals/new" className="btn-primary">
                  ✨ {t('proposalsList.createNew')}
                </Link>
              </div>
      <ul className="space-y-4">
        {proposals.map((proposal) => (
          <li key={proposal.id} className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{proposal.title || t('proposalsList.untitledProposal')}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {t('proposalsList.toClient')}: {proposal.client_name} — {t('proposalsList.fromSender')}: {proposal.sender_name}
            </p>
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => router.push(`/proposals/${proposal.id}`)}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                {t('proposalsList.view')}
              </button>
              <button
                onClick={() => router.push(`/proposals/${proposal.id}/edit`)}
                className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
              >
                {t('proposalsList.edit')}
              </button>
              <button
                onClick={() => handleDelete(proposal.id)}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              >
                {t('proposalsList.delete')}
              </button>
            </div>
          </li>
        ))}
      </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
