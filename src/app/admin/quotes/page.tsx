"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Trash2, Edit2 } from "lucide-react"

interface Quote {
  id: string
  quote_text: string
  author: string
  created_at: string
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const supabase = createClient()
        const { data, error: fetchError } = await supabase
          .from("posts")
          .select("id, quote_text, author, created_at")
          .eq("post_type", "quote")
          .order("created_at", { ascending: false })

        if (fetchError) throw fetchError
        setQuotes(data || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchQuotes()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quote?")) return

    try {
      const supabase = createClient()
      const { error: deleteError } = await supabase.from("posts").delete().eq("id", id)

      if (deleteError) throw deleteError
      setQuotes(quotes.filter((q) => q.id !== id))
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) return <div className="p-6">Loading quotes...</div>

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-8">Quotes</h1>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      <div className="grid gap-4">
        {quotes.length === 0 ? (
          <p className="text-muted-foreground">No quotes yet</p>
        ) : (
          quotes.map((quote) => (
            <div key={quote.id} className="bg-card border border-border rounded-lg p-4">
              <p className="text-lg italic mb-2">"{quote.quote_text}"</p>
              <p className="text-sm text-muted-foreground mb-4">— {quote.author || "Unknown"}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Edit2 size={16} />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" className="gap-2" onClick={() => handleDelete(quote.id)}>
                  <Trash2 size={16} />
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
