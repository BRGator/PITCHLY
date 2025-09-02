import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import AppleProvider from 'next-auth/providers/apple';
import EmailProvider from 'next-auth/providers/email';
import { createClient } from '@supabase/supabase-js';

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
      console.log('Creating user:', { name: user.name, email: user.email });
      
      const { data, error } = await supabase
        .from('users')
        .insert({ name: user.name, email: user.email, image: user.image })
        .select()
        .single();
        
      if (error) {
        console.error('Error creating user:', error);
        throw error;
      }
      
      console.log('User created successfully:', { id: data.id, email: data.email });
      return { id: data.id, ...data };
    },
    async getUser(id) {
      const { data } = await supabase.from('users').select().eq('id', id).single();
      return data;
    },
    async getUserByEmail(email) {
      console.log('=== GET USER BY EMAIL ===');
      console.log('Looking for email:', email);
      
      const { data, error } = await supabase.from('users').select().eq('email', email).single();
      
      console.log('getUserByEmail result:', { data, error: error?.message });
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
      try {
        console.log('=== LINK ACCOUNT START ===');
        console.log('Full account object:', JSON.stringify(account, null, 2));
        
        const accountData = {
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
        };
        
        console.log('Inserting account data:', JSON.stringify(accountData, null, 2));
        
        const { data, error } = await supabase
          .from('accounts')
          .insert(accountData)
          .select()
          .single();
          
        if (error) {
          console.error('=== LINK ACCOUNT ERROR ===');
          console.error('Supabase error:', JSON.stringify(error, null, 2));
          throw error;
        }
        
        console.log('=== LINK ACCOUNT SUCCESS ===');
        console.log('Account linked successfully:', JSON.stringify(data, null, 2));
        return data;
        
      } catch (error) {
        console.error('=== LINK ACCOUNT CATCH ===');
        console.error('Caught error:', error);
        throw error;
      }
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
        console.log('=== SIGNIN CALLBACK START ===');
        console.log('User:', JSON.stringify(user, null, 2));
        console.log('Account:', JSON.stringify(account, null, 2));
        
        // For OAuth providers, manually link the account if needed
        if (account?.provider && account.provider !== 'email') {
          console.log('=== OAUTH SIGNIN DETECTED ===');
          
          // Check if user exists in database by email
          const existingUser = await supabase
            .from('users')
            .select('id')
            .eq('email', user.email)
            .single();
            
          if (existingUser.data) {
            console.log('=== EXISTING USER FOUND ===', existingUser.data);
            
            // Check if account is already linked
            const existingAccount = await supabase
              .from('accounts')
              .select('id')
              .eq('user_id', existingUser.data.id)
              .eq('provider', account.provider)
              .eq('provider_account_id', account.providerAccountId)
              .single();
              
            if (!existingAccount.data) {
              console.log('=== MANUALLY LINKING ACCOUNT ===');
              
              // Manually link the account
              const { data: linkedAccount, error: linkError } = await supabase
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
                })
                .select()
                .single();
                
              if (linkError) {
                console.error('=== MANUAL LINK ERROR ===', linkError);
              } else {
                console.log('=== MANUAL LINK SUCCESS ===', linkedAccount);
              }
            } else {
              console.log('=== ACCOUNT ALREADY LINKED ===');
            }
          }
        }
        
        console.log('=== SIGNIN CALLBACK RETURNING TRUE ===');
        return true;
      } catch (error) {
        console.error('=== SIGNIN CALLBACK ERROR ===');
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