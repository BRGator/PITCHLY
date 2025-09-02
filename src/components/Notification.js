import { useState, useEffect } from 'react';

export default function Notification({ message, type = 'info', isVisible, onClose, duration = 4000 }) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible || !message) return null;

  const getNotificationStyle = () => {
    const baseStyle = 'fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border max-w-md transition-all duration-300 transform';
    
    switch (type) {
      case 'success':
        return `${baseStyle} bg-green-50 dark:bg-green-900/90 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200`;
      case 'error':
        return `${baseStyle} bg-red-50 dark:bg-red-900/90 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200`;
      case 'warning':
        return `${baseStyle} bg-yellow-50 dark:bg-yellow-900/90 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200`;
      default:
        return `${baseStyle} bg-blue-50 dark:bg-blue-900/90 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200`;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className={getNotificationStyle()}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Hook for using notifications
export function useNotification() {
  const [notification, setNotification] = useState({ message: '', type: 'info', isVisible: false });

  const showNotification = (message, type = 'info', duration = 4000) => {
    setNotification({ message, type, isVisible: true });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  const NotificationComponent = () => (
    <Notification
      message={notification.message}
      type={notification.type}
      isVisible={notification.isVisible}
      onClose={hideNotification}
    />
  );

  return {
    showNotification,
    hideNotification,
    NotificationComponent
  };
}