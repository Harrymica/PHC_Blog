"use client"
import { useEffect, useState } from "react"
import ArticleCard from "./article-card"
import SectionTitle from "./section-title"
import { createClient } from "@/lib/supabase/client"; 
import { set } from "date-fns";



export default function TrendingSection() {


  const supabase = createClient();
  const [post, setPost] = useState<any[]>([]);
  useEffect(() =>{


  async function FetchPost(){
      const {data} = await supabase.from("posts")
      .select("*")
      .eq("category", "Trending Post")
      .order("created_at", { ascending: false })
      .limit(4);

      setPost(data || []);
  }
  FetchPost();
}, [supabase])

  return (
    <section className="mb-12">
      <SectionTitle title="TRENDING POST" />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-stretch">
        {post.map((article, index) => {
          // Custom layout styles
          let layoutStyle = ""

          if (index === 0) {
            layoutStyle = "md:col-span-2 lg:col-span-2" // Make first item wider
          } else if (index === 3) {
            layoutStyle = "md:col-span-3 lg:col-span-4" // Last item full width
          }

          return (
            <div key={article.id} className={`${layoutStyle} h-64`}>
              <ArticleCard article={article} featured={index === 0} />
            </div>
          )
        })}
      </div>
    </section>
  )
}
