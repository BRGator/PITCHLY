import { useState } from 'react';
import UpgradeModal from './UpgradeModal';

export default function FeatureGate({ 
  feature, 
  subscription, 
  children, 
  fallback, 
  requiresPro = true,
  className = ""
}) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  const currentTier = subscription?.tier || 'free';
  const hasAccess = !requiresPro || currentTier === 'professional' || currentTier === 'agency';

  // If user has access, render children
  if (hasAccess) {
    return children;
  }

  // If fallback is provided, render it
  if (fallback) {
    return fallback;
  }

  // Default locked feature UI
  const handleUpgradeClick = () => {
    setShowUpgradeModal(true);
  };

  return (
    <>
      <div className={`relative ${className}`}>
        {/* Blurred/disabled content */}
        <div className="opacity-50 pointer-events-none select-none">
          {children}
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center p-6 max-w-sm">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-4a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2zm10-12a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Professional Feature
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Upgrade to unlock this feature and boost your productivity
            </p>
            <button
              onClick={handleUpgradeClick}
              className="btn-primary text-sm"
            >
              ⭐ Upgrade Now
            </button>
          </div>
        </div>
      </div>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        feature={feature}
        subscription={subscription}
      />
    </>
  );
}

// Convenience wrapper for inline feature gates
export function FeatureButton({ 
  feature, 
  subscription, 
  children, 
  onClick,
  requiresPro = true,
  ...props 
}) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  const currentTier = subscription?.tier || 'free';
  const hasAccess = !requiresPro || currentTier === 'professional' || currentTier === 'agency';

  const handleClick = (e) => {
    if (hasAccess) {
      onClick?.(e);
    } else {
      setShowUpgradeModal(true);
    }
  };

  return (
    <>
      <button
        {...props}
        onClick={handleClick}
        className={`${props.className} ${!hasAccess ? 'relative' : ''}`}
      >
        {children}
        {!hasAccess && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 text-white rounded-full text-xs flex items-center justify-center">
            ⭐
          </span>
        )}
      </button>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        feature={feature}
        subscription={subscription}
      />
    </>
  );
}