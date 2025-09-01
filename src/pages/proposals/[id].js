import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { supabase } from '../../lib/supabase';

export default function ProposalView() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle authentication client-side
  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  // Fetch proposal data
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
            setError('Proposal not found');
          } else {
            throw error;
          }
        } else {
          setProposal(data);
        }
      } catch (err) {
        console.error('Error fetching proposal:', err);
        setError('Failed to load proposal');
      } finally {
        setLoading(false);
      }
    };

    fetchProposal();
  }, [session, id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(proposal.content);
    alert('Proposal copied to clipboard!');
  };

  if (status === 'loading' || loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">Loading proposal...</p>
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
                Back to Dashboard
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
        <title>{proposal?.title} - PITCHLY</title>
        <meta name="description" content={`Proposal for ${proposal?.client_name}`} />
      </Head>

      <Navbar />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {proposal?.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <span>Client: {proposal?.client_name}</span>
                <span>•</span>
                <span>Created: {formatDate(proposal?.created_at)}</span>
                <span>•</span>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs">
                  {proposal?.status || 'Draft'}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={copyToClipboard}
                className="btn-ghost text-sm"
              >
                📋 Copy Text
              </button>
              <Link href="/dashboard" className="btn-ghost text-sm">
                ← Back to Dashboard
              </Link>
            </div>
          </div>

          {/* Proposal Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap font-serif leading-relaxed text-gray-900 dark:text-gray-100">
                {proposal?.content}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 text-center">
            <Link href="/proposals/new" className="btn-primary mr-4">
              Create Another Proposal
            </Link>
            <button
              onClick={() => window.print()}
              className="btn-ghost"
            >
              🖨️ Print Proposal
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
