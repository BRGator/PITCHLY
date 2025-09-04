// Regional Context Provider with I18n Integration
import { useState, useEffect, createContext, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { supabase } from '../lib/supabase';
import { REGIONS, LANGUAGES, detectRegionFromBrowser } from '../lib/regionalization';
import { translations, I18nContext } from '../lib/i18n';

// Regional Context
const RegionalContext = createContext({
  region: 'US',
  language: 'en',
  regionConfig: null,
  languageConfig: null,
  setRegion: () => {},
  setLanguage: () => {},
  loading: false
});

export const useRegional = () => {
  const context = useContext(RegionalContext);
  if (!context) {
    throw new Error('useRegional must be used within a RegionalProvider');
  }
  return context;
};

export default function RegionalProvider({ children }) {
  const { data: session } = useSession();
  const [region, setRegion] = useState('US');
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(true);
  // Create translation function for current language
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language] || translations.en;
    
    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }
    
    // Fallback to English if translation not found
    if (!value && language !== 'en') {
      value = translations.en;
      for (const k of keys) {
        value = value?.[k];
        if (!value) break;
      }
    }
    
    return value || key;
  };

  // Initialize region and language on mount
  useEffect(() => {
    const initializeRegion = async () => {
      try {
        // If user is logged in, try to get their saved preferences
        if (session?.user?.id) {
          const { data: userPrefs, error } = await supabase
            .from('users')
            .select('region, language')
            .eq('id', session.user.id)
            .single();

          if (!error && userPrefs) {
            if (userPrefs.region && REGIONS[userPrefs.region]) {
              setRegion(userPrefs.region);
            }
            if (userPrefs.language && LANGUAGES[userPrefs.language]) {
              setLanguage(userPrefs.language);
            } else {
              // Set language based on region if not explicitly set
              const regionConfig = REGIONS[userPrefs.region || 'US'];
              if (regionConfig && regionConfig.language) {
                setLanguage(regionConfig.language);
              }
            }
          } else {
            // No saved preferences, detect from browser
            const detectedRegion = detectRegionFromBrowser();
            setRegion(detectedRegion);
            setLanguage(REGIONS[detectedRegion]?.language || 'en');
          }
        } else {
          // Not logged in, detect from browser and save to localStorage
          const savedRegion = typeof window !== 'undefined' ? localStorage.getItem('pitchly-region') : null;
          const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('pitchly-language') : null;
          
          if (savedRegion && REGIONS[savedRegion]) {
            setRegion(savedRegion);
            setLanguage(savedLanguage && LANGUAGES[savedLanguage] ? savedLanguage : REGIONS[savedRegion].language);
          } else {
            const detectedRegion = detectRegionFromBrowser();
            setRegion(detectedRegion);
            setLanguage(REGIONS[detectedRegion]?.language || 'en');
            
            // Save to localStorage for next visit
            if (typeof window !== 'undefined') {
              localStorage.setItem('pitchly-region', detectedRegion);
              localStorage.setItem('pitchly-language', REGIONS[detectedRegion]?.language || 'en');
            }
          }
        }
      } catch (error) {
        console.error('Error initializing region:', error);
        // Fallback to detected region
        const detectedRegion = detectRegionFromBrowser();
        setRegion(detectedRegion);
        setLanguage(REGIONS[detectedRegion]?.language || 'en');
      } finally {
        setLoading(false);
      }
    };

    initializeRegion();
  }, [session?.user?.id]);

  // Update region handler
  const updateRegion = async (newRegion) => {
    if (!REGIONS[newRegion]) return;
    
    setRegion(newRegion);
    
    // Update language to match region's default if not explicitly set
    const regionConfig = REGIONS[newRegion];
    if (regionConfig.language !== language) {
      setLanguage(regionConfig.language);
    }
    
    try {
      // Save to user profile if logged in
      if (session?.user?.id) {
        await supabase
          .from('users')
          .update({ 
            region: newRegion,
            language: regionConfig.language,
            updated_at: new Date().toISOString()
          })
          .eq('id', session.user.id);
      } else {
        // Save to localStorage if not logged in
        if (typeof window !== 'undefined') {
          localStorage.setItem('pitchly-region', newRegion);
          localStorage.setItem('pitchly-language', regionConfig.language);
        }
      }
    } catch (error) {
      console.error('Error saving region preference:', error);
    }
  };

  // Update language handler
  const updateLanguage = async (newLanguage) => {
    if (!LANGUAGES[newLanguage]) return;
    
    setLanguage(newLanguage);
    
    try {
      // Save to user profile if logged in
      if (session?.user?.id) {
        await supabase
          .from('users')
          .update({ 
            language: newLanguage,
            updated_at: new Date().toISOString()
          })
          .eq('id', session.user.id);
      } else {
        // Save to localStorage if not logged in
        if (typeof window !== 'undefined') {
          localStorage.setItem('pitchly-language', newLanguage);
        }
      }
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  };

  const value = {
    region,
    language,
    regionConfig: REGIONS[region],
    languageConfig: LANGUAGES[language],
    setRegion: updateRegion,
    setLanguage: updateLanguage,
    loading
  };

  const i18nValue = {
    language,
    t
  };

  return (
    <RegionalContext.Provider value={value}>
      <I18nContext.Provider value={i18nValue}>
        {children}
      </I18nContext.Provider>
    </RegionalContext.Provider>
  );
}