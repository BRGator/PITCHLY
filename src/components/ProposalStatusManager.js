import { useState } from 'react';
import { useNotification } from './Notification';

export default function ProposalStatusManager({ proposal, onStatusUpdate, subscription }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { showNotification, NotificationComponent } = useNotification();

  const isProfessional = subscription?.tier === 'professional' || subscription?.tier === 'agency';
  
  // Basic statuses for free users
  const basicStatuses = [
    { key: 'draft', label: 'Draft', color: 'gray', description: 'Still working on this proposal' },
    { key: 'sent', label: 'Sent', color: 'blue', description: 'Proposal has been sent to client' },
    { key: 'viewed', label: 'Viewed', color: 'purple', description: 'Client has viewed the proposal' }
  ];

  // Enhanced statuses for Professional+ users
  const enhancedStatuses = [
    { key: 'draft', label: 'Draft', color: 'gray', description: 'Still working on this proposal' },
    { key: 'sent', label: 'Sent', color: 'blue', description: 'Proposal has been sent to client' },
    { key: 'viewed', label: 'Viewed', color: 'purple', description: 'Client has viewed the proposal' },
    { key: 'under_review', label: 'Under Review', color: 'yellow', description: 'Client is considering the proposal' },
    { key: 'accepted', label: 'Accepted', color: 'green', description: 'Client accepted the proposal! 🎉' },
    { key: 'won', label: 'Won/Signed', color: 'emerald', description: 'Contract signed and project started! 🚀' },
    { key: 'rejected', label: 'Rejected', color: 'red', description: 'Client declined the proposal' },
    { key: 'expired', label: 'Expired', color: 'gray', description: 'Proposal expired without response' },
    { key: 'withdrawn', label: 'Withdrawn', color: 'gray', description: 'Proposal was withdrawn' }
  ];

  const proposalStatuses = isProfessional ? enhancedStatuses : basicStatuses;

  const currentStatus = proposalStatuses.find(s => s.key === proposal?.status) || proposalStatuses[0];

  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true);
    setShowDropdown(false);
    
    try {
      const response = await fetch(`/api/proposals/${proposal.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      const updatedProposal = await response.json();
      onStatusUpdate?.(updatedProposal);
      showNotification(`Proposal status updated to "${proposalStatuses.find(s => s.key === newStatus)?.label}"`, 'success');
    } catch (error) {
      console.error('Error updating status:', error);
      const errorMsg = error.message || 'Failed to update proposal status. Please try again.';
      showNotification(errorMsg, 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      emerald: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
      red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };
    return colors[status] || colors.gray;
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status:</span>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            disabled={isUpdating}
            className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center space-x-1 transition-colors duration-200 ${
              getStatusColor(currentStatus.color)
            } ${!isUpdating ? 'hover:opacity-80 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
          >
            <span>{currentStatus.label}</span>
            {!isUpdating ? (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            ) : (
              <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
          </button>

          {showDropdown && (
            <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
              <div className="p-2">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2 px-2">
                  Update Proposal Status
                </h3>
                <div className="space-y-1">
                  {proposalStatuses.map((status) => (
                    <button
                      key={status.key}
                      onClick={() => handleStatusChange(status.key)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                        currentStatus.key === status.key
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(status.color)}`}>
                            {status.label}
                          </span>
                          {currentStatus.key === status.key && (
                            <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {status.description}
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* Upgrade prompt for free users */}
                {!isProfessional && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                    <div className="px-3 py-2 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-md border border-primary-200 dark:border-primary-800">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-4a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2zm10-12a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-primary-800 dark:text-primary-200">
                            Unlock More Statuses
                          </p>
                          <p className="text-xs text-primary-700 dark:text-primary-300 mt-1">
                            Track "Accepted", "Won", "Rejected" and more with Professional
                          </p>
                          <button 
                            onClick={() => {
                              setShowDropdown(false);
                              window.location.href = '/upgrade';
                            }}
                            className="text-xs text-primary-600 dark:text-primary-400 hover:underline mt-1 font-medium"
                          >
                            ⭐ Upgrade Now →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowDropdown(false)}
        />
      )}
      
      {/* Notification Component */}
      <NotificationComponent />
    </div>
  );
}