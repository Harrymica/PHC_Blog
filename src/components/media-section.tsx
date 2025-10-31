"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import MediaPlayer from "./media-player"

export default function MediaSection() {
  const [mediaItems, setMediaItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMedia = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from("posts")
        .select("*")
        .in("post_type", ["music", "video"])
        .order("created_at", { ascending: false })
        .limit(10)

      setMediaItems(data || [])
      setLoading(false)
    }

    fetchMedia()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading media...</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Media Library</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mediaItems.map((item) => (
          <div key={item.id}>
            {item.post_type === "music" && item.music_url && (
              <MediaPlayer src={item.music_url} type="audio" title={item.title} />
            )}
            {item.post_type === "video" && item.video_url && (
              <MediaPlayer src={item.video_url} type="video" title={item.title} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
