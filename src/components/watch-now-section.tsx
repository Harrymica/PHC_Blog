"use client"
import { Play, Pause } from "lucide-react"
import SectionTitle from "./section-title"
import { useEffect, useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client";
import MediaPlayer from "./media-player";


export default function WatchNowSection() {

  const supabase = createClient();
   const [mediaItems, setMediaItems] = useState<any[]>([]);
   const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null)

  // store video elements by id
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})


  const togglePlay = async (id: string) => {
    const vid = videoRefs.current[id]
    if (!vid) return

    try {
      if (vid.paused) {
        // pause currently playing other video
        if (playingId && playingId !== id) {
          const other = videoRefs.current[playingId]
          other?.pause()
        }
        await vid.play()
        setPlayingId(id)
      } else {
        vid.pause()
        setPlayingId(null)
      }
    } catch (err) {
      console.error("Playback error:", err)
    }
  }

  useEffect(() =>{

    async function getVideos(){
        const {data} = await supabase.from("posts")
        .select("*")
        .in("post_type", ["music", "video"])
        .order("created_at", { ascending: false })
        .limit(1);

        setMediaItems(data || []);
        if(mediaItems.length > 0){
          setIsReady(true);
        }
    }
    getVideos();
  }, [])
  
  
  {
    //if(isReady == true){
      return (
    <section className="mb-12">
      <SectionTitle title="WATCH NOW" />

        {mediaItems.map((item) => (
          <div
            key={item.id}
            className="relative rounded  bg-muted group cursor-pointer w-full h-full"
             
              style={{ aspectRatio: "16 / 9" }}
          >
            <video
              
              ref={(el) => { videoRefs.current[item.id] = el }}
              src={item.video_url}
              controls
              className="relative z-50 w-full h-full object-contain group-hover:opacity-75 transition video-bg"
              onEnded={() => {
                if (playingId === item.id) setPlayingId(null)
              }}
              onPause={() => {
                if (playingId === item.id) setPlayingId(null)
              }}
            
            />

            {/* <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-center justify-center pointer-events-none">
              <button
                type="button"
                className="pointer-events-auto bg-accent text-accent-foreground p-4 rounded-full hover:scale-110 transition"
                aria-label={playingId === item.id ? "Pause video" : "Play video"}
                onClick={(e) => {
                  e.stopPropagation()
                  togglePlay(item.id)
                }}
              >
                {playingId === item.id ? (
                  <Pause size={32} />
                ) : (
                  <Play size={32} fill="currentColor" />
                )}
              </button>
            </div> */}

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-white font-bold text-lg">{item.title ?? "Untitled"}</h3>
              <p className="text-gray-300 text-sm mt-2">{item.content ?? item.post_type}</p>
            </div>
          </div>
        ))}
     
    </section>
  )
   // }
};
  // return (
  //   <section className="mb-12">
  //     <SectionTitle title="WATCH NOW" />
          
  //     <div className="relative rounded overflow-hidden h-96 bg-muted group cursor-pointer">
  //       <img
  //         src="/video-thumbnail-news-broadcast.jpg"
  //         alt="Video"
  //         className="w-full h-full object-cover group-hover:opacity-75 transition"
  //       />
  //       <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-center justify-center">
  //         <button className="bg-accent text-accent-foreground p-4 rounded-full hover:scale-110 transition">
  //           <Play size={32} fill="currentColor" />
  //         </button>
  //       </div>
  //       <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
  //         <h3 className="text-white font-bold text-lg">Breaking News: Major Event Unfolds</h3>
  //         <p className="text-gray-300 text-sm mt-2">Watch the latest developments as they happen</p>
  //       </div>
  //     </div>
  //   </section>
  // )
}
