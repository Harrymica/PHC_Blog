"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import DashboardOverview from "@/components/admin/dashboard-overview"
import AnalyticsSection from "@/components/admin/analytics-section"

export default function AdminPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const supabase = createClient()
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser()

  //     if (!user) {
  //       window.location.href = "/auth/login"
  //       return
  //     }

  //     setUser(user)
  //     setLoading(false)
  //   }

  //   checkAuth()
  // }, [])

  // if (loading) {
  //   return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  // }

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <DashboardOverview />
      <AnalyticsSection />
    </div>
  )
}
