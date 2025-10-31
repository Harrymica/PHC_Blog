import ArticleCard from "./article-card"
import SectionTitle from "./section-title"

const lifestyleArticles = [
  {
    id: 5,
    title: "Sexy, Gender And Morality: The Unseen History Of Underwear",
    category: "LIFESTYLE",
    image: "/fashion-history-clothing.jpg",
    excerpt: "Exploring the cultural significance and evolution of intimate apparel...",
  },
  {
    id: 6,
    title: "Self-healing material that can carry current may advance smart textiles",
    category: "TECH",
    image: "/smart-textile-technology.jpg",
  },
  {
    id: 7,
    title: "How to Take the Perfect Selfie, According to a Celebrity",
    category: "LIFESTYLE",
    image: "/photography-selfie-tips.jpg",
  },
]

export default function LifeStylesSection() {
  return (
    <section className="mb-12">
      <SectionTitle title="LIFE STYLES" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lifestyleArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}
