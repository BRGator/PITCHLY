// Custom magic link verification that creates NextAuth sessions
import { getServerSession } from 'next-auth/next';
import { authOptions } from './[...nextauth]';
import { createClient } from '@supabase/supabase-js';
import { getToken } from 'next-auth/jwt';

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token, email } = req.query;
    
    if (!token || !email) {
      return res.redirect('/auth/error?error=missing-parameters');
    }

    // Verify the token
    const { data: verificationToken, error } = await supabase
      .from('verification_tokens')
      .select('*')
      .eq('identifier', email)
      .eq('token', token)
      .single();

    if (error || !verificationToken) {
      return res.redirect('/auth/error?error=invalid-token');
    }

    // Check if token has expired
    if (new Date() > new Date(verificationToken.expires)) {
      // Clean up expired token
      await supabase
        .from('verification_tokens')
        .delete()
        .eq('identifier', email)
        .eq('token', token);
      
      return res.redirect('/auth/error?error=token-expired');
    }

    // Check if user exists, create if they don't
    let { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (!user) {
      // Create new user
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          email: email,
          name: email.split('@')[0], // Use email prefix as default name
        })
        .select()
        .single();

      if (createError) {
        console.error('Error creating user:', createError);
        return res.redirect('/auth/error?error=user-creation-failed');
      }

      user = newUser;
    }

    // Delete the verification token (single use)
    await supabase
      .from('verification_tokens')
      .delete()
      .eq('identifier', email)
      .eq('token', token);

    // Create a session token
    const sessionToken = require('crypto').randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    // Create session in database
    await supabase
      .from('sessions')
      .insert({
        session_token: sessionToken,
        user_id: user.id,
        expires: expires.toISOString()
      });

    // Set the session cookie
    const cookieName = 'next-auth.session-token';
    const cookieOptions = [
      `${cookieName}=${sessionToken}`,
      'Path=/',
      'HttpOnly',
      'SameSite=Lax',
      `Expires=${expires.toUTCString()}`,
      process.env.NODE_ENV === 'production' ? 'Secure' : ''
    ].filter(Boolean).join('; ');

    res.setHeader('Set-Cookie', cookieOptions);

    // Create a success page that handles same-tab redirect
    const successPageHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Signing you in...</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
            }
            .container {
              text-align: center;
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(10px);
              border-radius: 20px;
              padding: 40px;
              border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .spinner {
              width: 50px;
              height: 50px;
              border: 4px solid rgba(255, 255, 255, 0.3);
              border-top: 4px solid white;
              border-radius: 50%;
              animation: spin 1s linear infinite;
              margin: 0 auto 20px;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="spinner"></div>
            <h2>Welcome to PITCHLY!</h2>
            <p>Signing you in securely...</p>
          </div>
          
          <script>
            (function() {
              function redirect() {
                var targetUrl = '${process.env.NEXTAUTH_URL}/dashboard';
                
                try {
                  // Multiple methods to ensure same-tab redirect
                  if (window.history && window.history.replaceState) {
                    window.history.replaceState(null, '', targetUrl);
                  }
                  
                  // Try different redirect methods
                  if (window.parent && window.parent !== window) {
                    window.parent.location.href = targetUrl;
                  } else if (window.top && window.top !== window) {
                    window.top.location.href = targetUrl;
                  } else {
                    window.location.replace(targetUrl);
                  }
                } catch (error) {
                  window.location.href = targetUrl;
                }
              }
              
              // Wait a moment then redirect
              setTimeout(redirect, 1500);
            })();
          </script>
        </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(successPageHTML);

  } catch (error) {
    console.error('Magic link verification error:', error);
    return res.redirect('/auth/error?error=verification-failed');
  }
}