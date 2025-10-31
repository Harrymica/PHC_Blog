import ArticleCard from "./article-card"
import SectionTitle from "./section-title"

const entertainmentArticles = [
  {
    id: 11,
    title: "How to Make Your Makeup Stay All Night Long, According to Rave Girls",
    category: "ENTERTAINMENT",
    image: "/makeup-beauty-entertainment.jpg",
  },
  {
    id: 12,
    title: "Sexy, Gender And Morality: The Unseen History Of Underwear",
    category: "ENTERTAINMENT",
    image: "/entertainment-news.png",
  },
  {
    id: 13,
    title: "Sexy, Gender And Morality: The Unseen History Of Underwear",
    category: "ENTERTAINMENT",
    image: "/celebrity-news-headline.png",
  },
]

export default function EntertainmentSection() {
  return (
    <section className="mb-12">
      <SectionTitle title="ENTERTAINMENT" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entertainmentArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}
