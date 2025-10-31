"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function AnalyticsSection() {
  const [analytics, setAnalytics] = useState({
    recentPosts: [],
    recentSubscribers: [],
  })

  useEffect(() => {
    const fetchAnalytics = async () => {
      const supabase = createClient()

      const [postsRes, subscribersRes] = await Promise.all([
        supabase
          .from("posts")
          .select("id, title, post_type, created_at")
          .order("created_at", { ascending: false })
          .limit(5),
        supabase
          .from("newsletter_subscribers")
          .select("email, subscribed_at")
          .order("subscribed_at", { ascending: false })
          .limit(5),
      ])

      setAnalytics({
        recentPosts: postsRes.data || [],
        recentSubscribers: subscribersRes.data || [],
      })
    }

    fetchAnalytics()
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
        <div className="space-y-3">
          {analytics.recentPosts.length > 0 ? (
            analytics.recentPosts.map((post: any) => (
              <div key={post.id} className="p-3 bg-muted rounded">
                <p className="font-semibold">{post.title}</p>
                <p className="text-sm text-muted-foreground">
                  {post.post_type} • {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No posts yet</p>
          )}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Recent Subscribers</h2>
        <div className="space-y-3">
          {analytics.recentSubscribers.length > 0 ? (
            analytics.recentSubscribers.map((subscriber: any, idx: number) => (
              <div key={idx} className="p-3 bg-muted rounded">
                <p className="font-semibold">{subscriber.email}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(subscriber.subscribed_at).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No subscribers yet</p>
          )}
        </div>
      </div>
    </div>
  )
}
