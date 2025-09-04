import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Performance & SEO optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://api.openai.com" />
        <link rel="preconnect" href="https://supabase.co" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Viewport for mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* iOS PWA Configuration */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Synchronous CSS for iOS status bar background - CRITICAL for iOS Safari */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --safe-area-inset-top: env(safe-area-inset-top, 0);
              --safe-area-inset-bottom: env(safe-area-inset-bottom, 0);
            }
            
            html {
              min-height: calc(100% + var(--safe-area-inset-top));
              padding-top: var(--safe-area-inset-top);
              padding-bottom: var(--safe-area-inset-bottom);
              background: #f1f4f8;
              background-image: linear-gradient(135deg, #f1f4f8 0%, #e8ecf4 25%, #dde4f0 50%, #e2e8f0 75%, #f1f5f9 100%);
              background-size: 400% 400%;
              background-attachment: fixed;
              
              /* Ensure background covers bounce area */
              min-height: 100%;
              height: auto;
            }
            
            @media (prefers-color-scheme: dark) {
              html {
                background: #0f172a;
                background-image: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%);
                background-size: 400% 400%;
                background-attachment: fixed;
              }
            }
            
            body {
              margin: 0;
              min-height: 100vh;
              min-height: 100dvh;
              background: inherit;
            }
          `
        }} />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Theme colors for mobile browsers - matches app background gradient */}
        <meta name="theme-color" content="#f1f4f8" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
        <meta name="msapplication-navbutton-color" content="#f1f4f8" />
        
        {/* iOS Safari bounce background color */}
        <meta name="format-detection" content="telephone=no" />
        
        {/* Manifest for PWA */}
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}