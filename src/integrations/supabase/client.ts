import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

// Singleton so HMR / route revisits don't spawn duplicate clients
let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!url || !key) return null;
  if (_client) return _client;
  _client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { "x-application": "mastervlsi-web" } },
  });
  return _client;
}

/** Lightweight, RLS-friendly insert helpers (no PII leakage in errors). */
export async function safeInsert<T extends Record<string, unknown>>(
  table: string,
  row: T,
): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "offline" };
  const { error } = await sb.from(table).insert(row as never);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
