import { MessageCircle, Share2 } from "lucide-react"

interface Article {
  id: number
  title: string
  category: string
  image: string
  excerpt?: string
}

interface ArticleCardProps {
  article: Article
  featured?: boolean
  compact?: boolean
}

export default function ArticleCard({ article, featured, compact }: ArticleCardProps) {
  if (featured) {
    return (
      <div className="col-span-1 md:col-span-2 lg:col-span-2 rounded overflow-hidden bg-card hover:shadow-lg transition cursor-pointer group w-full h-full">
        <div className="relative h-full md:h-80 overflow-hidden">
          <img
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
            <span className="inline-block bg-accent text-accent-foreground px-3 py-1 text-xs font-bold rounded w-fit mb-3">
              {article.category}
            </span>
            <h3 className="text-white font-bold text-xl md:text-2xl line-clamp-2">{article.title}</h3>
            {article.excerpt && <p className="text-gray-200 text-sm mt-2 line-clamp-2">{article.excerpt}</p>}
          </div>
        </div>
      </div>
    )
  }

  if (compact) {
    return (
      <div className="rounded overflow-hidden bg-card hover:shadow-lg transition cursor-pointer group">
        <div className="relative h-40 overflow-hidden">
          <img
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
            <span className="inline-block bg-accent text-accent-foreground px-2 py-1 text-xs font-bold rounded w-fit mb-2">
              {article.category}
            </span>
            <h3 className="text-white font-bold text-sm line-clamp-2">{article.title}</h3>
          </div>
        </div>
      </div>
    )
  }

  return (
  <div className="rounded overflow-hidden bg-card hover:shadow-lg transition cursor-pointer group w-full h-full">
    <div className="relative h-full overflow-hidden"> {/* Increased height */}
      <img
        src={article.image || "/placeholder.svg"}
        alt={article.title}
        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
      />

      {/* Category Tag */}
      <span className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 text-xs font-bold rounded">
        {article.category}
      </span>

      {/* Title & Buttons inside the image */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        <h3 className="font-bold text-white text-sm md:text-base line-clamp-2 mb-3">
          {article.title}
        </h3>
        <div className="flex items-center gap-4 text-xs text-gray-200">
          <button className="flex items-center gap-1 hover:text-accent transition">
            <MessageCircle size={14} />
            <span>Comment</span>
          </button>
          <button className="flex items-center gap-1 hover:text-accent transition">
            <Share2 size={14} />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  </div>
)

}
