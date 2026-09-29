import { describe, it, expect } from 'vitest';
import { getSupabaseClient, isSupabaseConfigured } from '../../src/lib/supabase/client';
import { getSupabaseServerClient, isSupabaseServerConfigured } from '../../src/lib/supabase/server';

describe('Supabase Client & Server Helpers', () => {
  it('returns false or null when unconfigured in local test environment', () => {
    expect(typeof isSupabaseConfigured).toBe('boolean');
    expect(typeof isSupabaseServerConfigured).toBe('boolean');

    const client = getSupabaseClient();
    const serverClient = getSupabaseServerClient();

    if (!isSupabaseConfigured) {
      expect(client).toBeNull();
    }
    if (!isSupabaseServerConfigured) {
      expect(serverClient).toBeNull();
    }
  });
});
