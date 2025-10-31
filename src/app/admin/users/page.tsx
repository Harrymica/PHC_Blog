"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

interface Subscriber {
  id: string
  email: string
  subscribed_at: string
  unsubscribed_at: string | null
}

export default function UsersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        window.location.href = "/auth/login"
        return
      }

      setUser(user)

      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .is("unsubscribed_at", null)
        .order("subscribed_at", { ascending: false })

      if (error) {
        console.error("Error fetching subscribers:", error)
      } else {
        setSubscribers(data || [])
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-8">Newsletter Subscribers</h1>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Subscribed Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="border-b border-border hover:bg-muted/50 transition">
                  <td className="px-6 py-4 text-sm">{subscriber.email}</td>
                  <td className="px-6 py-4 text-sm">{new Date(subscriber.subscribed_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          Total Subscribers: <span className="font-bold text-foreground">{subscribers.length}</span>
        </p>
      </div>

      {subscribers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No subscribers yet.</p>
        </div>
      )}
    </div>
  )
}
