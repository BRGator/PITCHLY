import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import DarkModeToggle from './DarkModeToggle';
import RegionSelector from './RegionSelector';
import { useI18n } from '../lib/i18n';

export default function Navbar() {
  const { data: session, status } = useSession();
  const { t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper function to get user initials
  const getUserInitials = (name, email) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return '?';
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'glass-effect shadow-lg backdrop-blur-xl' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <span className="text-2xl font-black text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 tracking-tight animate-gradient-wave">
              PITCHLY
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#features" className="btn-ghost">
              {t('nav.features')}
            </Link>
            <Link href="/#pricing" className="btn-ghost">
              {t('nav.pricing')}
            </Link>
            <Link href="/#testimonials" className="btn-ghost">
              {t('nav.testimonials')}
            </Link>
            {session && (
              <Link href="/dashboard" className="btn-ghost">
                {t('nav.dashboard')}
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <RegionSelector variant="compact" />
            <DarkModeToggle />
            
            {status === 'loading' ? (
              <div className="w-8 h-8 animate-spin rounded-full border-2 border-primary-600 border-t-transparent"></div>
            ) : session ? (
              <div className="flex items-center space-x-3">
                <Link href="/profile" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm border-2 border-gray-200 dark:border-gray-700">
                      {getUserInitials(session.user.name, session.user.email)}
                    </div>
                  )}
                  <span className="hidden sm:block text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                    {session.user.name || session.user.email}
                  </span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="btn-ghost text-sm"
                >
                  {t('nav.signOut')}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth/signin?from=signin"
                  className="btn-ghost"
                >
                  {t('nav.signIn')}
                </Link>
                <Link
                  href="/auth/signin?from=getstarted"
                  className="btn-primary"
                >
                  {t('nav.getStarted')}
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 glass-effect border-t border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <Link href="/#features" className="block btn-ghost text-left w-full">
                {t('nav.features')}
              </Link>
              <Link href="/#pricing" className="block btn-ghost text-left w-full">
                {t('nav.pricing')}
              </Link>
              <Link href="/#testimonials" className="block btn-ghost text-left w-full">
                {t('nav.testimonials')}
              </Link>
              {session && (
                <Link href="/dashboard" className="block btn-ghost text-left w-full">
                  {t('nav.dashboard')}
                </Link>
              )}
              {!session && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => signIn()}
                    className="btn-primary w-full mb-2"
                  >
                    {t('nav.getStarted')}
                  </button>
                  <button
                    onClick={() => signIn()}
                    className="btn-secondary w-full"
                  >
                    {t('nav.signIn')}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}