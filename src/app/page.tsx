// import Header from "@/components/header"
import Header from "../components/header"
import CategoryHeader from "@/components/category-header"
import TrendingSection from "@/components/trending-section"
import LifeStylesSection from "@/components/intimacy-worship"
import WorldNewsSection from "@/components/upcoming-event"
import WatchNowSection from "@/components/watch-now-section"
import EntertainmentSection from "@/components/entertainment-section"
import RightSidebar from "@/components/right-sidebar"
import NewsletterSection from "@/components/newsletter-section"
import Footer from "@/components/footer"
import MediaSection from "@/components/media-section"
import NewsletterPopup from "@/components/newsletter-popup"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NewsletterPopup />
      <Header />
      <CategoryHeader />

      <div className="flex flex-col lg:flex-row gap-0">
        {/* Main Content */}
        <main className="flex-1 px-4 md:px-6 py-6 lg:px-8">
          <TrendingSection />
          <LifeStylesSection />
          <WorldNewsSection />
          {/* <MediaSection /> */}
          <WatchNowSection />
          <EntertainmentSection />
          <NewsletterSection />
        </main>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
      <Footer />
    </div>
  )
}
