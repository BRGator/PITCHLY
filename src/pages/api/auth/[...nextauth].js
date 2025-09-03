import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import AppleProvider from 'next-auth/providers/apple';
import EmailProvider from 'next-auth/providers/email';
import { createClient } from '@supabase/supabase-js';
import { createTransporter } from 'nodemailer';

// Create direct Supabase client for adapter using service role key
const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zthdmjgwuqwlgxmrdirw.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0aGRtamd3dXF3bGd4bXJkaXJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1MzAzMTEsImV4cCI6MjA3MjEwNjMxMX0.apb12xES_fbqNAo30TZfxvqnhS6n78Ac5HKkmqrgWEA'
);

export const authOptions = {
  // Enable automatic account linking for same email addresses
  allowDangerousEmailAccountLinking: true,
  adapter: {
    async createUser(user) {
      const { data, error } = await supabase
        .from('users')
        .insert({ name: user.name, email: user.email, image: user.image })
        .select()
        .single();
        
      if (error) throw error;
      return { id: data.id, ...data };
    },
    async getUser(id) {
      const { data } = await supabase.from('users').select().eq('id', id).single();
      return data;
    },
    async getUserByEmail(email) {
      const { data, error } = await supabase.from('users').select().eq('email', email).single();
      return data;
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const { data } = await supabase
        .from('accounts')
        .select(`
          user_id,
          users (*)
        `)
        .eq('provider', provider)
        .eq('provider_account_id', providerAccountId)
        .single();
      return data?.users;
    },
    async updateUser(user) {
      const { data, error } = await supabase
        .from('users')
        .update(user)
        .eq('id', user.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    async createSession({ sessionToken, userId, expires }) {
      const { data, error } = await supabase
        .from('sessions')
        .insert({ session_token: sessionToken, user_id: userId, expires })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    async getSessionAndUser(sessionToken) {
      const { data } = await supabase
        .from('sessions')
        .select(`
          *,
          users (*)
        `)
        .eq('session_token', sessionToken)
        .single();
      return data ? { session: data, user: data.users } : null;
    },
    async updateSession({ sessionToken, ...session }) {
      const { data } = await supabase
        .from('sessions')
        .update(session)
        .eq('session_token', sessionToken)
        .select()
        .single();
      return data;
    },
    async deleteSession(sessionToken) {
      await supabase.from('sessions').delete().eq('session_token', sessionToken);
    },
    async linkAccount(account) {
      const { data, error } = await supabase
        .from('accounts')
        .insert({
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state
        })
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    async unlinkAccount({ providerAccountId, provider }) {
      await supabase
        .from('accounts')
        .delete()
        .eq('provider', provider)
        .eq('provider_account_id', providerAccountId);
    },
    async createVerificationToken({ identifier, expires, token }) {
      const { data, error } = await supabase
        .from('verification_tokens')
        .insert({ identifier, expires, token })
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    async useVerificationToken({ identifier, token }) {
      const { data, error } = await supabase
        .from('verification_tokens')
        .delete()
        .eq('identifier', identifier)
        .eq('token', token)
        .select()
        .single();
      
      // If token not found or already used, return null (NextAuth expects this)
      if (error && error.code === 'PGRST116') {
        return null;
      }
      
      // For other errors, log and return null to prevent crashes
      if (error) {
        console.error('Token verification error:', error);
        return null;
      }
      
      return data;
    }
  },
  providers: [
    // Email Authentication
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM,
      maxAge: 24 * 60 * 60, // 24 hours
      sendVerificationRequest: async ({ identifier: email, url, provider }) => {
        // Custom email template to encourage same-tab behavior
        const transport = createTransporter(provider.server);
        
        await transport.sendMail({
          to: email,
          from: provider.from,
          subject: 'Sign in to PITCHLY',
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Sign in to PITCHLY</title>
              </head>
              <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);">
                  <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
                    
                    <!-- PITCHLY Logo -->
                    <div style="text-align: center; margin-bottom: 30px;">
                      <div style="display: inline-flex; align-items: center; space-x: 2px;">
                        <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #3B82F6, #1D4ED8); border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; margin-right: 12px;">
                          <span style="color: white; font-weight: bold; font-size: 24px;">P</span>
                        </div>
                        <span style="font-size: 28px; font-weight: bold; color: #1D4ED8;">PITCHLY</span>
                      </div>
                    </div>

                    <h1 style="color: #1D4ED8; text-align: center; margin-bottom: 30px; font-size: 24px; font-weight: 600;">
                      Sign in to your account
                    </h1>
                    
                    <p style="color: #666; text-align: center; margin-bottom: 30px; font-size: 16px;">
                      Click the button below to securely sign in to PITCHLY. This link will expire in 24 hours.
                    </p>
                    
                    <div style="text-align: center; margin: 40px 0;">
                      <a href="${url}" 
                         id="signin-link"
                         style="display: inline-block; background: linear-gradient(135deg, #3B82F6, #1D4ED8); color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); transition: all 0.2s;">
                        ✨ Sign in to PITCHLY
                      </a>
                    </div>
                    
                    <p style="color: #666; font-size: 14px; text-align: center; margin-top: 30px; line-height: 1.5;">
                      If you didn't request this email, you can safely ignore it.<br>
                      This link is valid for 24 hours and can only be used once.
                    </p>
                    
                    <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px; text-align: center;">
                      <p style="color: #999; font-size: 12px; margin: 0;">
                        © 2024 PITCHLY. All rights reserved.<br>
                        <a href="${process.env.NEXTAUTH_URL}" style="color: #3B82F6; text-decoration: none;">usepitchly.com</a>
                      </p>
                    </div>
                  </div>
                </div>
                
                <!-- JavaScript to encourage same-tab behavior -->
                <script>
                  document.addEventListener('DOMContentLoaded', function() {
                    const link = document.getElementById('signin-link');
                    if (link) {
                      // Multiple strategies to ensure same-tab behavior
                      link.removeAttribute('target');
                      
                      link.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        // Try multiple methods to navigate in same tab
                        try {
                          // Method 1: window.location (most reliable)
                          window.location.href = this.href;
                        } catch (error) {
                          // Method 2: fallback to window.open with _self
                          try {
                            window.open(this.href, '_self');
                          } catch (error2) {
                            // Method 3: fallback to creating a new link element
                            const newLink = document.createElement('a');
                            newLink.href = this.href;
                            newLink.target = '_self';
                            document.body.appendChild(newLink);
                            newLink.click();
                            document.body.removeChild(newLink);
                          }
                        }
                      });
                    }
                  });
                </script>
              </body>
            </html>
          `,
          text: `Sign in to PITCHLY\n\nClick this link to sign in: ${url}\n\nIf you didn't request this email, you can safely ignore it.\nThis link expires in 24 hours.`
        });
      }
    }),
    
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    
    // Apple Sign-in (disabled until revenue generation)
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // })
  ],
  pages: {
    verifyRequest: '/auth/verify-request',
    error: '/auth/error'
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // For OAuth providers, manually link the account if needed
        if (account?.provider && account.provider !== 'email') {
          // Check if user exists in database by email
          const existingUser = await supabase
            .from('users')
            .select('id')
            .eq('email', user.email)
            .single();
            
          if (existingUser.data) {
            // Check if account is already linked
            const existingAccount = await supabase
              .from('accounts')
              .select('id')
              .eq('user_id', existingUser.data.id)
              .eq('provider', account.provider)
              .eq('provider_account_id', account.providerAccountId)
              .single();
              
            if (!existingAccount.data) {
              // Manually link the account
              await supabase
                .from('accounts')
                .insert({
                  user_id: existingUser.data.id,
                  type: account.type,
                  provider: account.provider,
                  provider_account_id: account.providerAccountId,
                  refresh_token: account.refresh_token,
                  access_token: account.access_token,
                  expires_at: account.expires_at,
                  token_type: account.token_type,
                  scope: account.scope,
                  id_token: account.id_token,
                  session_state: account.session_state
                });
            }
          }
        }
        
        return true;
      } catch (error) {
        console.error('SignIn callback error:', error);
        return false;
      }
    },
    async session({ session, token }) {
      // Attach user ID to session
      session.user.id = token.sub;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      // After successful sign-in, redirect appropriately
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      
      // Always redirect to dashboard - it will handle onboarding check
      return `${baseUrl}/dashboard`;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
};

export default NextAuth(authOptions);