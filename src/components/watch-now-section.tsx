import { Play } from "lucide-react"
import SectionTitle from "./section-title"

export default function WatchNowSection() {
  return (
    <section className="mb-12">
      <SectionTitle title="WATCH NOW" />
      <div className="relative rounded overflow-hidden h-96 bg-muted group cursor-pointer">
        <img
          src="/video-thumbnail-news-broadcast.jpg"
          alt="Video"
          className="w-full h-full object-cover group-hover:opacity-75 transition"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-center justify-center">
          <button className="bg-accent text-accent-foreground p-4 rounded-full hover:scale-110 transition">
            <Play size={32} fill="currentColor" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <h3 className="text-white font-bold text-lg">Breaking News: Major Event Unfolds</h3>
          <p className="text-gray-300 text-sm mt-2">Watch the latest developments as they happen</p>
        </div>
      </div>
    </section>
  )
}
