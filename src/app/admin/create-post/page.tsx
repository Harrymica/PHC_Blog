"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import PostForm from "@/components/admin/post-form"
import AdminSidebar from "@/components/admin/admin-sidebar"

export default function CreatePostPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        window.location.href = "/auth/login"
        return
      }

      setUser(user)
      setLoading(false)
    }

    checkAuth()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* <AdminSidebar /> */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
          <PostForm />
        </div>
      </main>
    </div>
  )
}
