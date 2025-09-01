import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { supabase } from '../../lib/supabase';
import jsPDF from 'jspdf';

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

  const downloadPDF = () => {
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const proposalTitle = proposal?.title || 'Proposal';
      const clientName = proposal?.client_name || 'Client';
      const content = proposal?.content || '';
      
      // Set up the document
      pdf.setFontSize(20);
      pdf.text(proposalTitle, 20, 20);
      
      pdf.setFontSize(12);
      pdf.text(`Client: ${clientName}`, 20, 35);
      pdf.text(`Date: ${formatDate(proposal?.created_at)}`, 20, 45);
      
      // Add a line separator
      pdf.line(20, 55, 190, 55);
      
      // Add content
      pdf.setFontSize(10);
      const splitContent = pdf.splitTextToSize(content, 170);
      pdf.text(splitContent, 20, 70);
      
      // Generate filename
      const filename = `${proposalTitle.replace(/[^a-z0-9]/gi, '_')}_${clientName.replace(/[^a-z0-9]/gi, '_')}.pdf`;
      
      // Save the PDF
      pdf.save(filename);
      
    } catch (error) {
      console.error('PDF generation failed:', error);
      // Fallback to print dialog
      alert('PDF generation failed. Using print dialog instead.');
      window.print();
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
        <style jsx global>{`
          @media print {
            /* Hide everything except proposal content */
            .print\:hidden { display: none !important; }
            nav, .navbar, header { display: none !important; }
            
            /* Only show proposal content */
            .proposal-content {
              margin: 0 !important;
              padding: 20px !important;
              box-shadow: none !important;
              border-radius: 0 !important;
              background: white !important;
              color: black !important;
            }
            
            body { 
              background: white !important; 
              font-size: 12pt !important;
              line-height: 1.5 !important;
            }
            
            h1, h2, h3 { 
              color: black !important; 
              page-break-after: avoid;
            }
          }
        `}</style>
      </Head>

      <Navbar />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-6 print:hidden">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {proposal?.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <span>Client: {proposal?.client_name}</span>
                {proposal?.client_email && (
                  <>
                    <span>•</span>
                    <span>{proposal.client_email}</span>
                  </>
                )}
                <span>•</span>
                <span>Created: {formatDate(proposal?.created_at)}</span>
                <span>•</span>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs">
                  {proposal?.status || 'Draft'}
                </span>
              </div>
              
              {/* Additional project details */}
              {(proposal?.project_description || proposal?.budget_range || proposal?.timeline) && (
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  {proposal?.project_description && (
                    <div className="mb-2">
                      <span className="font-medium">Project:</span> {proposal.project_description}
                    </div>
                  )}
                  <div className="flex space-x-6">
                    {proposal?.budget_range && (
                      <span><span className="font-medium">Budget:</span> {proposal.budget_range}</span>
                    )}
                    {proposal?.timeline && (
                      <span><span className="font-medium">Timeline:</span> {proposal.timeline}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex space-x-3">
              <Link href="/dashboard" className="btn-ghost text-sm">
                ← Back to Dashboard
              </Link>
            </div>
          </div>

          {/* Proposal Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 proposal-content">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap font-serif leading-relaxed text-gray-900 dark:text-gray-100">
                {proposal?.content}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 print:hidden">
            {/* Main Actions */}
            <div className="text-center mb-6">
              <Link href="/proposals/new" className="btn-primary mr-4">
                ✨ Create Another Proposal
              </Link>
              <Link 
                href={`/proposals/${proposal?.id}/revise`}
                className="btn-secondary"
              >
                ✏️ Request Modifications
              </Link>
            </div>
            
            {/* Export Options */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Export & Share Options
              </h3>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={copyToClipboard}
                  className="btn-ghost"
                >
                  📋 Copy Text
                </button>
                <button
                  onClick={() => downloadPDF()}
                  className="btn-ghost"
                >
                  📄 Save as PDF
                </button>
                <button
                  onClick={() => window.print()}
                  className="btn-ghost"
                >
                  🖨️ Print Proposal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
