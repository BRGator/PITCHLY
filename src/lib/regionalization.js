// Regionalization utilities and configuration
import { createContext, useContext } from 'react';

// Supported regions and their configurations
export const REGIONS = {
  'US': {
    name: 'United States',
    currency: 'USD',
    currencySymbol: '$',
    dateFormat: 'MM/DD/YYYY',
    numberFormat: '1,000.00',
    language: 'en',
    businessStyle: 'direct',
    proposalTone: 'roi-focused',
    timeZone: 'America/New_York',
    flag: '🇺🇸'
  },
  'CA': {
    name: 'Canada',
    currency: 'CAD',
    currencySymbol: 'C$',
    dateFormat: 'MM/DD/YYYY',
    numberFormat: '1,000.00',
    language: 'en',
    businessStyle: 'polite',
    proposalTone: 'collaborative',
    timeZone: 'America/Toronto',
    flag: '🇨🇦'
  },
  'GB': {
    name: 'United Kingdom',
    currency: 'GBP',
    currencySymbol: '£',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: '1,000.00',
    language: 'en',
    businessStyle: 'formal',
    proposalTone: 'professional',
    timeZone: 'Europe/London',
    flag: '🇬🇧'
  },
  'DE': {
    name: 'Germany',
    currency: 'EUR',
    currencySymbol: '€',
    dateFormat: 'DD.MM.YYYY',
    numberFormat: '1.000,00',
    language: 'de',
    businessStyle: 'detailed',
    proposalTone: 'thorough',
    timeZone: 'Europe/Berlin',
    flag: '🇩🇪'
  },
  'FR': {
    name: 'France',
    currency: 'EUR',
    currencySymbol: '€',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: '1 000,00',
    language: 'fr',
    businessStyle: 'formal',
    proposalTone: 'elegant',
    timeZone: 'Europe/Paris',
    flag: '🇫🇷'
  },
  'ES': {
    name: 'Spain',
    currency: 'EUR',
    currencySymbol: '€',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: '1.000,00',
    language: 'es',
    businessStyle: 'relationship-focused',
    proposalTone: 'warm',
    timeZone: 'Europe/Madrid',
    flag: '🇪🇸'
  },
  'IT': {
    name: 'Italy',
    currency: 'EUR',
    currencySymbol: '€',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: '1.000,00',
    language: 'it',
    businessStyle: 'relationship-focused',
    proposalTone: 'passionate',
    timeZone: 'Europe/Rome',
    flag: '🇮🇹'
  },
  'NL': {
    name: 'Netherlands',
    currency: 'EUR',
    currencySymbol: '€',
    dateFormat: 'DD-MM-YYYY',
    numberFormat: '1.000,00',
    language: 'nl',
    businessStyle: 'direct',
    proposalTone: 'practical',
    timeZone: 'Europe/Amsterdam',
    flag: '🇳🇱'
  },
  'BR': {
    name: 'Brazil',
    currency: 'BRL',
    currencySymbol: 'R$',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: '1.000,00',
    language: 'pt',
    businessStyle: 'relationship-focused',
    proposalTone: 'enthusiastic',
    timeZone: 'America/Sao_Paulo',
    flag: '🇧🇷'
  },
  'AU': {
    name: 'Australia',
    currency: 'AUD',
    currencySymbol: 'A$',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: '1,000.00',
    language: 'en',
    businessStyle: 'casual',
    proposalTone: 'straightforward',
    timeZone: 'Australia/Sydney',
    flag: '🇦🇺'
  },
  'MX': {
    name: 'Mexico',
    currency: 'MXN',
    currencySymbol: '$',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: '1,000.00',
    language: 'es',
    businessStyle: 'relationship-focused',
    proposalTone: 'respectful',
    timeZone: 'America/Mexico_City',
    flag: '🇲🇽'
  },
  'AR': {
    name: 'Argentina',
    currency: 'ARS',
    currencySymbol: '$',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: '1.000,00',
    language: 'es',
    businessStyle: 'formal',
    proposalTone: 'sophisticated',
    timeZone: 'America/Argentina/Buenos_Aires',
    flag: '🇦🇷'
  },
  'CO': {
    name: 'Colombia',
    currency: 'COP',
    currencySymbol: '$',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: '1.000,00',
    language: 'es',
    businessStyle: 'relationship-focused',
    proposalTone: 'warm',
    timeZone: 'America/Bogota',
    flag: '🇨🇴'
  },
  'CL': {
    name: 'Chile',
    currency: 'CLP',
    currencySymbol: '$',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: '1.000,00',
    language: 'es',
    businessStyle: 'professional',
    proposalTone: 'efficient',
    timeZone: 'America/Santiago',
    flag: '🇨🇱'
  },
  'PE': {
    name: 'Peru',
    currency: 'PEN',
    currencySymbol: 'S/',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: '1,000.00',
    language: 'es',
    businessStyle: 'relationship-focused',
    proposalTone: 'collaborative',
    timeZone: 'America/Lima',
    flag: '🇵🇪'
  }
};

// Language configurations
export const LANGUAGES = {
  'en': { name: 'English', nativeName: 'English' },
  'es': { name: 'Spanish', nativeName: 'Español' },
  'fr': { name: 'French', nativeName: 'Français' },
  'de': { name: 'German', nativeName: 'Deutsch' },
  'it': { name: 'Italian', nativeName: 'Italiano' },
  'pt': { name: 'Portuguese', nativeName: 'Português' },
  'nl': { name: 'Dutch', nativeName: 'Nederlands' }
};

// Business proposal tone adaptations by region
export const PROPOSAL_ADAPTATIONS = {
  'direct': {
    greeting: 'I\'m pleased to present this proposal for your consideration.',
    closing: 'I look forward to moving forward with this project.',
    emphasis: 'ROI and efficiency',
    structure: 'concise'
  },
  'formal': {
    greeting: 'We are delighted to present this comprehensive proposal for your esteemed consideration.',
    closing: 'We would be honoured to partner with you on this important initiative.',
    emphasis: 'credentials and methodology',
    structure: 'detailed'
  },
  'relationship-focused': {
    greeting: 'It would be our privilege to work together on this exciting project.',
    closing: 'We believe this partnership will create lasting value for your organization.',
    emphasis: 'collaboration and trust',
    structure: 'narrative'
  },
  'collaborative': {
    greeting: 'We\'re excited about the opportunity to collaborate with your team.',
    closing: 'Together, we can achieve exceptional results for this project.',
    emphasis: 'teamwork and shared success',
    structure: 'partnership-focused'
  }
};

// Currency formatting utility
export const formatCurrency = (amount, regionCode = 'US') => {
  const region = REGIONS[regionCode];
  if (!region) return `$${amount}`;
  
  try {
    const formatter = new Intl.NumberFormat(getLocale(regionCode), {
      style: 'currency',
      currency: region.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
    return formatter.format(amount);
  } catch (error) {
    return `${region.currencySymbol}${amount}`;
  }
};

// Date formatting utility
export const formatDate = (date, regionCode = 'US') => {
  const region = REGIONS[regionCode];
  if (!region) return date.toLocaleDateString();
  
  try {
    const formatter = new Intl.DateTimeFormat(getLocale(regionCode));
    return formatter.format(date);
  } catch (error) {
    return date.toLocaleDateString();
  }
};

// Number formatting utility
export const formatNumber = (number, regionCode = 'US') => {
  const region = REGIONS[regionCode];
  if (!region) return number.toLocaleString();
  
  try {
    const formatter = new Intl.NumberFormat(getLocale(regionCode));
    return formatter.format(number);
  } catch (error) {
    return number.toLocaleString();
  }
};

// Get locale string from region code
export const getLocale = (regionCode) => {
  const region = REGIONS[regionCode];
  if (!region) return 'en-US';
  
  const localeMap = {
    'US': 'en-US',
    'CA': 'en-CA',
    'GB': 'en-GB',
    'DE': 'de-DE',
    'FR': 'fr-FR',
    'ES': 'es-ES',
    'IT': 'it-IT',
    'NL': 'nl-NL',
    'BR': 'pt-BR',
    'AU': 'en-AU',
    'MX': 'es-MX',
    'AR': 'es-AR',
    'CO': 'es-CO',
    'CL': 'es-CL',
    'PE': 'es-PE'
  };
  
  return localeMap[regionCode] || 'en-US';
};

// Detect region from IP (client-side approximation)
export const detectRegionFromBrowser = () => {
  if (typeof window === 'undefined') return 'US';
  
  try {
    // Try to get timezone first
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Map common timezones to regions
    const timezoneMap = {
      'America/New_York': 'US',
      'America/Chicago': 'US',
      'America/Denver': 'US',
      'America/Los_Angeles': 'US',
      'America/Toronto': 'CA',
      'America/Vancouver': 'CA',
      'Europe/London': 'GB',
      'Europe/Berlin': 'DE',
      'Europe/Paris': 'FR',
      'Europe/Madrid': 'ES',
      'Europe/Rome': 'IT',
      'Europe/Amsterdam': 'NL',
      'America/Sao_Paulo': 'BR',
      'America/Mexico_City': 'MX',
      'America/Cancun': 'MX',
      'America/Argentina/Buenos_Aires': 'AR',
      'America/Bogota': 'CO',
      'America/Santiago': 'CL',
      'America/Lima': 'PE',
      'Australia/Sydney': 'AU',
      'Australia/Melbourne': 'AU'
    };
    
    if (timezoneMap[timeZone]) {
      return timezoneMap[timeZone];
    }
    
    // Fallback to language
    const language = navigator.language || navigator.userLanguage;
    const langMap = {
      'en-US': 'US',
      'en-CA': 'CA',
      'en-GB': 'GB',
      'de': 'DE',
      'de-DE': 'DE',
      'fr': 'FR',
      'fr-FR': 'FR',
      'es': 'ES',
      'es-ES': 'ES',
      'it': 'IT',
      'it-IT': 'IT',
      'nl': 'NL',
      'nl-NL': 'NL',
      'pt-BR': 'BR',
      'en-AU': 'AU'
    };
    
    return langMap[language] || 'US';
  } catch (error) {
    console.log('Region detection fallback to US:', error);
    return 'US';
  }
};

// Regional Context
export const RegionalContext = createContext({
  region: 'US',
  language: 'en',
  setRegion: () => {},
  setLanguage: () => {}
});

export const useRegional = () => {
  const context = useContext(RegionalContext);
  if (!context) {
    throw new Error('useRegional must be used within a RegionalProvider');
  }
  return context;
};