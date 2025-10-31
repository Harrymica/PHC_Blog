import ArticleCard from "./article-card"
import SectionTitle from "./section-title"

const trendingArticles = [
  {
    id: 1,
    title: "Spectacular New Bridges That Break The Mold",
    category: "TRENDING",
    image: "/modern-bridge.png",
    excerpt: "Discover innovative bridge designs that are reshaping urban landscapes...",
  },
  {
    id: 2,
    title: "Explore Exotic Cruises With Us",
    category: "TRAVEL",
    image: "/luxury-cruise-ship-ocean.jpg",
  },
  {
    id: 3,
    title: "Eat This, Not That: Essential Food",
    category: "FOOD",
    image: "/healthy-food-nutrition.png",
  },
  {
    id: 4,
    title: "Luxury Lifestyle Awaits",
    category: "LIFESTYLE",
    image: "/luxury-lifestyle-fashion.jpg",
  },
]

export default function TrendingSection() {
  return (
    <section className="mb-12">
      <SectionTitle title="TRENDING POST" />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-stretch">
        {trendingArticles.map((article, index) => {
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
