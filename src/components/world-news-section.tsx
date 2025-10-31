import ArticleCard from "./article-card"
import SectionTitle from "./section-title"

const worldNewsArticles = [
  {
    id: 8,
    title: "Sexy, Gender And Morality: The Unseen History Of Underwear",
    category: "WORLD",
    image: "/world-news-global-events.jpg",
  },
  {
    id: 9,
    title: "Sexy, Gender And Morality: The Unseen History Of Underwear",
    category: "WORLD",
    image: "/international-news.png",
  },
  {
    id: 10,
    title: "Sexy, Gender And Morality: The Unseen History Of Underwear",
    category: "WORLD",
    image: "/global-politics.jpg",
  },
]

export default function WorldNewsSection() {
  return (
    <section className="mb-12">
      <SectionTitle title="WORLD NEWS" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {worldNewsArticles.map((article) => (
          <ArticleCard key={article.id} article={article} compact />
        ))}
      </div>
    </section>
  )
}
