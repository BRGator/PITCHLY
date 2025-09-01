import { createClient } from '@supabase/supabase-js';

// Use NEXT_PUBLIC_ variables for client-side access
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 
                   'https://zthdmjgwuqwlgxmrdirw.supabase.co';

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
                       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0aGRtamd3dXF3bGd4bXJkaXJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1MzAzMTEsImV4cCI6MjA3MjEwNjMxMX0.apb12xES_fbqNAo30TZfxvqnhS6n78Ac5HKkmqrgWEA';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key exists:', !!supabaseAnonKey);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase };
export function getSupabaseClient() {
  return supabase;
}

export default supabase;
