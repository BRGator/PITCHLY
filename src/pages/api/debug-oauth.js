// Debug endpoint to test OAuth setup
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Test if we can access the accounts table
    const { data: accountsData, error: accountsError } = await supabase
      .from('accounts')
      .select('*')
      .limit(1);

    // Test if we can access the users table
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(1);

    return res.status(200).json({
      message: 'OAuth debug info',
      environment: {
        hasSupabaseUrl: !!process.env.SUPABASE_URL,
        hasPublicSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        hasAnonKey: !!process.env.SUPABASE_ANON_KEY,
        hasPublicAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
        hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
      },
      database: {
        accountsAccess: accountsError ? `Error: ${accountsError.message}` : 'OK',
        accountsCount: accountsData ? accountsData.length : 0,
        usersAccess: usersError ? `Error: ${usersError.message}` : 'OK',
        usersCount: usersData ? usersData.length : 0,
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Debug failed',
      message: error.message
    });
  }
}