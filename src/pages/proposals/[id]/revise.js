import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import { supabase } from '../../../lib/supabase';
import { useI18n } from '../../../lib/i18n';

export default function ReviseProposal() {
  const { t } = useI18n();
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [revisionRequest, setRevisionRequest] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  // Handle authentication
  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  // Fetch original proposal
  useEffect(() => {
    const fetchProposal = async () => {
      if (!session?.user?.id || !id) return;

      try {
        const { data, error } = await supabase
          .from('proposals')
          .select('*')
          .eq('id', id)
          .eq('user_id', session.user.id)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            setError(t('proposalRevise.proposalNotFound'));
          } else {
            throw error;
          }
        } else {
          setProposal(data);
        }
      } catch (err) {
        console.error('Error fetching proposal:', err);
        setError(t('proposalRevise.failedToLoad'));
      } finally {
        setLoading(false);
      }
    };

    fetchProposal();
  }, [session, id]);

  const handleRevisionSubmit = async (e) => {
    e.preventDefault();
    if (!revisionRequest.trim()) return;

    setIsGenerating(true);

    try {
      const response = await fetch('/api/proposals/revise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originalProposalId: id,
          originalContent: proposal.content,
          revisionRequest: revisionRequest,
          originalTitle: proposal.title,
          clientName: proposal.client_name
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t('proposalRevise.failedToLoad'));
      }

      // Redirect to the new revision
      router.push(`/proposals/${data.proposal.id}`);
      
    } catch (error) {
      console.error('Error generating revision:', error);
      alert(t('proposalRevise.revisionError') + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">{t('proposalRevise.loadingProposal')}</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {error}
              </h1>
              <Link href="/dashboard" className="btn-primary">
                {t('proposalRevise.backToDashboard')}
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{t('proposalRevise.reviseTitle')} {proposal?.title} - PITCHLY</title>
        <meta name="description" content={t('proposalRevise.requestModifications')} />
      </Head>

      <Navbar />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {t('proposalRevise.requestModifications')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('proposalRevise.requestModificationsDesc')} "{proposal?.title}"
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Original Proposal Preview */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {t('proposalRevise.originalProposal')}
              </h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-h-96 overflow-y-auto">
                <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {proposal?.content}
                </div>
              </div>
            </div>

            {/* Revision Request Form */}
            <div>
              <form onSubmit={handleRevisionSubmit}>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {t('proposalRevise.whatWouldYouChange')}
                </h2>
                
                <textarea
                  value={revisionRequest}
                  onChange={(e) => setRevisionRequest(e.target.value)}
                  rows={12}
                  className="input-field mb-6"
                  placeholder={t('proposalRevise.revisionPlaceholder')}
                  required
                />

                <div className="bg-primary-50 dark:bg-primary-900 rounded-lg p-4 mb-6">
                  <p className="text-sm text-primary-700 dark:text-primary-300">
                    {t('proposalRevise.revisionTip')}
                  </p>
                </div>

                <div className="flex justify-between">
                  <Link 
                    href={`/proposals/${id}`}
                    className="btn-ghost"
                  >
                    {t('proposalRevise.backToProposal')}
                  </Link>
                  
                  <button
                    type="submit"
                    disabled={isGenerating || !revisionRequest.trim()}
                    className="btn-primary"
                  >
                    {isGenerating ? t('proposalRevise.generatingRevision') : t('proposalRevise.generateRevision')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}