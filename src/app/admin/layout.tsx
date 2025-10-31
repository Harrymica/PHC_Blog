import { cookies } from "next/headers"
import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { redirect } from "next/navigation"
import AdminProvider from "@/components/admin/AdminProvider"
import AdminSidebar from "@/components/admin/admin-sidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value ?? ""
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set(name, value, options)
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.delete(name)
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth/login")
  }

  return (
    <AdminProvider initialSession={session}>
      <div className="flex min-h-screen bg-background transition-all duration-300">
        <AdminSidebar />
      
        <main className="flex-1 w-full md:ml-64 md:pl-4 mb-20 md:mb-0 overflow-auto lg:transition-all lg:duration-300">
          {children}
        </main>
      </div>
    </AdminProvider>
  )
}
