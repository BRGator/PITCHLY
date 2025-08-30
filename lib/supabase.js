// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

export function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("❌ Supabase env vars missing:", { supabaseUrl, supabaseAnonKey });
    throw new Error("Supabase environment variables not found.");
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}
