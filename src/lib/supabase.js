import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('Supabase URL is missing from environment variables');
}
if (!supabaseAnonKey) {
  throw new Error('Supabase Anon Key is missing from environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase };
export function getSupabaseClient() {
  return supabase;
}

export default supabase;
