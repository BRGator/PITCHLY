// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

console.log("📦 Supabase env check →", { supabaseUrl, supabaseAnonKey: supabaseAnonKey?.slice(0, 10) + '...' });

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
