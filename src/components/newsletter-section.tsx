import { Send } from "lucide-react"

export default function NewsletterSection() {
  return (
    <section className="mb-12 bg-muted rounded-lg p-8 md:p-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">SIGN UP FOR NEWSLETTER</h2>
      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
        Get all the latest news, views and offers from the best online shopping site in India
      </p>
      <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 bg-card text-foreground rounded outline-none focus:ring-2 focus:ring-accent"
        />
        <button className="bg-accent text-accent-foreground px-6 py-3 rounded font-bold hover:opacity-90 transition flex items-center justify-center gap-2">
          <Send size={18} />
          <span className="hidden sm:inline">SEND</span>
        </button>
      </div>
    </section>
  )
}
