// Shared dark mode utilities
import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for dark mode preference
    const checkDarkMode = () => {
      const isDarkMode = 
        document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(isDarkMode);
    };

    // Initial check
    checkDarkMode();

    // Listen for changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const observer = new MutationObserver(checkDarkMode);
    
    mediaQuery.addEventListener('change', checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      mediaQuery.removeEventListener('change', checkDarkMode);
      observer.disconnect();
    };
  }, []);

  return isDark;
};

// Get Stripe appearance configuration for PITCHLY theme
export const getStripeAppearance = (isDark = false) => ({
  theme: isDark ? 'night' : 'stripe',
  variables: {
    colorPrimary: '#3B82F6',
    colorBackground: isDark ? '#1F2937' : '#ffffff',
    colorText: isDark ? '#F9FAFB' : '#1F2937',
    colorDanger: '#EF4444',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    spacingUnit: '4px',
    borderRadius: '8px',
  },
  rules: {
    '.Input': {
      backgroundColor: isDark ? '#374151' : '#ffffff',
      border: isDark ? '1px solid #4B5563' : '1px solid #D1D5DB',
      color: isDark ? '#F9FAFB' : '#1F2937',
    },
    '.Input:focus': {
      border: '2px solid #3B82F6',
      boxShadow: '0 0 0 1px #3B82F6',
    },
    '.Label': {
      color: isDark ? '#D1D5DB' : '#374151',
      fontSize: '14px',
      fontWeight: '500',
    },
    '.Tab': {
      backgroundColor: isDark ? '#374151' : '#F3F4F6',
      color: isDark ? '#D1D5DB' : '#4B5563',
      border: isDark ? '1px solid #4B5563' : '1px solid #E5E7EB',
    },
    '.Tab:hover': {
      backgroundColor: isDark ? '#4B5563' : '#E5E7EB',
    },
    '.Tab--selected': {
      backgroundColor: isDark ? '#1F2937' : '#ffffff',
      color: isDark ? '#F9FAFB' : '#1F2937',
      border: '2px solid #3B82F6',
    },
    '.Block': {
      backgroundColor: isDark ? '#374151' : '#ffffff',
      border: isDark ? '1px solid #4B5563' : '1px solid #E5E7EB',
    },
    '.BlockDivider': {
      backgroundColor: isDark ? '#4B5563' : '#E5E7EB',
    },
    '.AccordionItem': {
      backgroundColor: isDark ? '#374151' : '#ffffff',
      border: isDark ? '1px solid #4B5563' : '1px solid #E5E7EB',
    },
    '.AccordionItem--selected': {
      backgroundColor: isDark ? '#1F2937' : '#F9FAFB',
    }
  }
});