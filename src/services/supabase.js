import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase = null;

if (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your_supabase_url_here') {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
  console.warn("Supabase is not configured yet. History will not be saved.");
}

export default supabase;
