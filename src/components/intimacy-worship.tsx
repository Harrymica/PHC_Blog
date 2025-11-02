"use client"
import { useEffect, useState } from "react"
import ArticleCard from "./article-card"
import SectionTitle from "./section-title"
import { createClient } from "@/lib/supabase/client";


export default function LifeStylesSection() {

  const supabase = createClient();
  const [post, setPost] = useState<any[]>([]);
  useEffect(() =>{
    async function FetchPost(){
      const {data} = await supabase.from("posts")
      .select("*")
      .eq("category", "Intimacy Worship")
      .order("created_at", { ascending: false })
      .limit(3);
      setPost(data || []);
    }
    FetchPost();
  }, [supabase])

  return (
    <section className="mb-12">
      <SectionTitle title="INTIMACY WORSHIP" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {post.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}
