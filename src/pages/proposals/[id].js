import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import ProposalStatusManager from '../../components/ProposalStatusManager';
import { useNotification } from '../../components/Notification';
import { supabase } from '../../lib/supabase';
import jsPDF from 'jspdf';

export default function ProposalView() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const { showNotification, NotificationComponent } = useNotification();

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
          
          // Mark proposal as viewed if it's still in draft status
          if (data.status === 'draft') {
            fetch('/api/proposals/mark-viewed', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ proposalId: id })
            }).catch(err => console.error('Failed to mark as viewed:', err));
          }
        }
      } catch (err) {
        console.error('Error fetching proposal:', err);
        setError('Failed to load proposal');
      } finally {
        setLoading(false);
      }
    };

    // Fetch subscription data
    const fetchSubscription = async () => {
      try {
        const response = await fetch('/api/subscription/check-limits');
        const subscriptionData = await response.json();
        if (response.ok) {
          setSubscription(subscriptionData.subscription);
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
      }
    };

    fetchProposal();
    fetchSubscription();
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
    showNotification('Proposal copied to clipboard!', 'success');
  };

  const handleStatusUpdate = (updatedProposal) => {
    setProposal(updatedProposal);
  };

  const downloadPDF = () => {
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const proposalTitle = proposal?.title || 'Proposal';
      const clientName = proposal?.client_name || 'Client';
      const content = proposal?.content || '';
      
      // Page dimensions
      const pageHeight = pdf.internal.pageSize.height;
      const pageWidth = pdf.internal.pageSize.width;
      const margin = 20;
      const maxWidth = pageWidth - (margin * 2);
      const lineHeight = 6;
      let yPosition = 30;
      
      // Header
      pdf.setFontSize(16);
      pdf.setFont(undefined, 'bold');
      pdf.text(proposalTitle, margin, yPosition);
      yPosition += 15;
      
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      pdf.text(`Client: ${clientName}`, margin, yPosition);
      yPosition += 7;
      pdf.text(`Date: ${formatDate(proposal?.created_at)}`, margin, yPosition);
      yPosition += 10;
      
      // Separator line
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 10;
      
      // Content with proper pagination
      pdf.setFontSize(10);
      const lines = pdf.splitTextToSize(content, maxWidth);
      
      for (let i = 0; i < lines.length; i++) {
        // Check if we need a new page
        if (yPosition + lineHeight > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        
        pdf.text(lines[i], margin, yPosition);
        yPosition += lineHeight;
      }
      
      // Generate clean filename
      const filename = `${proposalTitle.replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, '_')}_${clientName.replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, '_')}.pdf`;
      
      // Save the PDF
      pdf.save(filename);
      
    } catch (error) {
      console.error('PDF generation failed:', error);
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
            /* Reset everything for clean print */
            * {
              box-shadow: none !important;
              text-shadow: none !important;
              filter: none !important;
              -webkit-filter: none !important;
              background: transparent !important;
              color: black !important;
            }
            
            /* Hide all UI elements */
            .print\:hidden,
            nav, .navbar, header, .bg-gray-50, .dark\:bg-gray-900 {
              display: none !important;
            }
            
            /* Clean body styling */
            body {
              background: white !important;
              color: black !important;
              font-family: 'Times New Roman', Times, serif !important;
              font-size: 12pt !important;
              line-height: 1.4 !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            
            /* Clean page container */
            .proposal-page {
              background: white !important;
              color: black !important;
              margin: 0 !important;
              padding: 20px !important;
              max-width: none !important;
            }
            
            /* Proposal content styling */
            .proposal-content {
              background: white !important;
              color: black !important;
              border: none !important;
              border-radius: 0 !important;
              box-shadow: none !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            
            /* Typography for print */
            h1, h2, h3, h4, h5, h6 {
              color: black !important;
              font-weight: bold !important;
              page-break-after: avoid;
            }
            
            p {
              color: black !important;
              margin: 0 0 12px 0 !important;
              orphans: 3;
              widows: 3;
            }
            
            /* Hide any remaining UI elements */
            .container, .max-w-4xl, .mx-auto {
              max-width: none !important;
              margin: 0 !important;
              padding: 0 !important;
            }
          }
        `}</style>
      </Head>

      <Navbar />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 p-6 proposal-page">
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
              </div>
              
              {/* Status Manager */}
              <div className="mt-3">
                <ProposalStatusManager 
                  proposal={proposal} 
                  subscription={subscription}
                  onStatusUpdate={handleStatusUpdate}
                />
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">
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
      
      {/* Notifications */}
      <NotificationComponent />
    </>
  );
}
