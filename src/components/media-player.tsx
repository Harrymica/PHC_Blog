"use client"

import { useState } from "react"
import { Play, Pause, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MediaPlayerProps {
  src: string
  type: "audio" | "video"
  title?: string
}

export default function MediaPlayer({ src, type, title }: MediaPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handleDownload = () => {
    const a = document.createElement("a")
    a.href = src
    a.download = title || "media"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  if (type === "audio") {
    return (
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-4">
          <Button size="sm" variant="outline" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </Button>
          <audio
            src={src}
            controls
            className="flex-1"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          <Button size="sm" variant="outline" onClick={handleDownload}>
            <Download size={16} />
          </Button>
        </div>
        {title && <p className="text-sm text-muted-foreground mt-2">{title}</p>}
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <video
        src={src}
        controls
        className="w-full"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className="p-4 flex items-center justify-between">
        {title && <p className="font-semibold">{title}</p>}
        <Button size="sm" variant="outline" onClick={handleDownload}>
          <Download size={16} />
        </Button>
      </div>
    </div>
  )
}
