"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import StatsCard from "./stats-card"
import { FileText, Users, Music, Quote } from "lucide-react"

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalSubscribers: 0,
    totalMedia: 0,
    totalQuotes: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient()

      const [postsRes, subscribersRes, mediaRes, quotesRes] = await Promise.all([
        supabase.from("posts").select("id", { count: "exact" }),
        supabase.from("newsletter_subscribers").select("id", { count: "exact" }),
        supabase.from("media_files").select("id", { count: "exact" }),
        supabase.from("quotes").select("id", { count: "exact" }),
      ])

      setStats({
        totalPosts: postsRes.count || 0,
        totalSubscribers: subscribersRes.count || 0,
        totalMedia: mediaRes.count || 0,
        totalQuotes: quotesRes.count || 0,
      })
    }

    fetchStats()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard title="Total Posts" value={stats.totalPosts} icon={FileText} color="bg-blue-500" />
      <StatsCard title="Newsletter Subscribers" value={stats.totalSubscribers} icon={Users} color="bg-green-500" />
      <StatsCard title="Media Files" value={stats.totalMedia} icon={Music} color="bg-purple-500" />
      <StatsCard title="Quotes" value={stats.totalQuotes} icon={Quote} color="bg-orange-500" />
    </div>
  )
}
