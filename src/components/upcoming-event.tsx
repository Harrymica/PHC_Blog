"use client"
import { useEffect, useState } from "react";
import ArticleCard from "./article-card"
import SectionTitle from "./section-title"
import { createClient } from "@/lib/supabase/client"



export default function WorldNewsSection() {

  const supabase = createClient();
  const [post, setPost] = useState<any[]>([]);

  useEffect(() =>{
    async function FetchPost(){
      const {data} = await supabase.from('posts')
                  .select("*")
                  .eq("category", "Upcoming Events")
                  .order("created_at", { ascending: false })
                  .limit(3);

      setPost(data || []);  
    }
    FetchPost();

  }, [supabase])

  return (
    <section className="mb-12">
      <SectionTitle title="UPCOMING EVENT" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {post.map((article) => (
          <ArticleCard key={article.id} article={article} compact />
        ))}
      </div>
    </section>
  )
}
