import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  // keep using your helper but pass auth options so session behavior is explicit
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,        // keep session persisted client-side
        detectSessionInUrl: false,   // avoid picking up session from redirect URL
      },
    }
  )
}