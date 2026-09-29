import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || import.meta.env.SUPABASE_SERVICE_ROLE_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseServerConfigured = Boolean(
  supabaseUrl && 
  supabaseServiceKey && 
  !supabaseUrl.includes('your-project') &&
  !supabaseServiceKey.includes('your-supabase')
);

let supabaseServerInstance: SupabaseClient<any> | null = null;

export function getSupabaseServerClient(): SupabaseClient<any> | null {
  if (!isSupabaseServerConfigured) {
    return null;
  }

  if (!supabaseServerInstance) {
    supabaseServerInstance = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
  }

  return supabaseServerInstance;
}
