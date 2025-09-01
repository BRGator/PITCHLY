import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import AppleProvider from 'next-auth/providers/apple';
import EmailProvider from 'next-auth/providers/email';
import { createClient } from '@supabase/supabase-js';

// Create direct Supabase client for adapter
const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zthdmjgwuqwlgxmrdirw.supabase.co',
  process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0aGRtamd3dXF3bGd4bXJkaXJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1MzAzMTEsImV4cCI6MjA3MjEwNjMxMX0.apb12xES_fbqNAo30TZfxvqnhS6n78Ac5HKkmqrgWEA'
);

export const authOptions = {
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
      console.log('getUserByEmail called with:', email);
      const { data, error } = await supabase.from('users').select().eq('email', email).single();
      console.log('getUserByEmail result:', data, 'error:', error);
      return data;
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const { data } = await supabase
        .from('accounts')
        .select('users(*)')
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
        .select('*, users(*)')
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
    async createVerificationToken({ identifier, expires, token }) {
      console.log('Creating verification token for:', identifier);
      console.log('Token data:', { identifier, expires, token: token.substring(0, 10) + '...' });
      console.log('Supabase URL being used:', supabase.supabaseUrl);
      
      // Try a simple select first to test database connection
      const { data: testQuery, error: testError } = await supabase
        .from('verification_tokens')
        .select('count(*)')
        .limit(1);
      console.log('Database connection test:', testQuery, testError);
      
      const { data, error } = await supabase
        .from('verification_tokens')
        .insert({ identifier, expires, token })
        .select()
        .single();
        
      console.log('Insert response - data:', data);
      console.log('Insert response - error:', error);
        
      if (error) {
        console.error('Error creating verification token:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        throw error;
      }
      
      if (!data) {
        console.error('No data returned from insert operation');
        throw new Error('Token creation failed - no data returned');
      }
      
      console.log('Verification token created successfully:', data);
      return data;
    },
    async useVerificationToken({ identifier, token }) {
      console.log('useVerificationToken called with:', { identifier, token });
      const { data, error } = await supabase
        .from('verification_tokens')
        .delete()
        .eq('identifier', identifier)
        .eq('token', token)
        .select()
        .single();
      
      console.log('useVerificationToken result:', data, 'error:', error);
      
      // If token not found or already used, return null (NextAuth expects this)
      if (error && error.code === 'PGRST116') {
        console.log('Token not found (already used or expired)');
        return null;
      }
      
      // For other errors, log and return null to prevent crashes
      if (error) {
        console.error('Token verification error:', error);
        return null;
      }
      
      console.log('Token verification successful');
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
    }),
    
    // Google OAuth (temporarily disabled - add credentials later)
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    
    // Apple Sign-in (temporarily disabled - add credentials later)
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // })
  ],
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
    error: '/auth/error'
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('SignIn callback - User:', user);
      console.log('SignIn callback - Account:', account);
      console.log('SignIn callback - Email:', email);
      
      // User creation handled by adapter
      return true;
    },
    async session({ session, token }) {
      console.log('Session Callback - Token:', token);
      console.log('Session Callback - Session before:', session);
      
      // Attach user ID to session
      session.user.id = token.sub;
      
      console.log('Session Callback - Session after:', session);
      return session;
    },
    async jwt({ token, user, account }) {
      console.log('JWT Callback - Token:', token);
      console.log('JWT Callback - User:', user);
      console.log('JWT Callback - Account:', account);
      
      if (user) {
        token.sub = user.id;
        console.log('JWT Callback - Setting token.sub to:', user.id);
      }
      
      console.log('JWT Callback - Final token:', token);
      return token;
    },
    async redirect({ url, baseUrl, token }) {
      console.log('Redirect callback - url:', url, 'baseUrl:', baseUrl);
      
      // After successful sign-in, redirect appropriately
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      
      // For magic link verification, redirect to dashboard
      if (url.includes('/api/auth/callback/email')) {
        console.log('Magic link callback - redirecting to dashboard');
        return `${baseUrl}/dashboard`;
      }
      
      // Default redirect to dashboard - it will handle onboarding check
      console.log('Default redirect to dashboard');
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