"use client"

export default function RightSidebar() {
  return (
    <aside className="hidden min-h-screen lg:block w-80 px-6 py-6 space-y-8 border-l border-border sticky top-20 self-start max-h-[85vh] overflow-y-auto">
      {/* Popular Section */}
      <div className="">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-accent rounded"></span>
          POPULAR
        </h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 cursor-pointer hover:opacity-80 transition">
              <img
                src={`/generic-article-thumbnail.png?height=80&width=80&query=article thumbnail ${i}`}
                alt="Article"
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <p className="text-sm font-medium line-clamp-2">This News Is Doing Both Sides Of The Aisle</p>
                <p className="text-xs text-muted-foreground mt-1">Posted on November 2017</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stay Connected */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-accent rounded"></span>
          STAY CONNECTED
        </h3>
        <div className="space-y-3">
          <button className="w-full bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700 transition">
            👍 LIKE 1.2M
          </button>
          <button className="w-full bg-blue-400 text-white py-2 rounded text-sm font-medium hover:bg-blue-500 transition">
            🐦 FOLLOW 1.1M
          </button>
          <button className="w-full bg-red-600 text-white py-2 rounded text-sm font-medium hover:bg-red-700 transition">
            ▶️ SUBSCRIBE 1.1M
          </button>
          <button className="w-full bg-pink-600 text-white py-2 rounded text-sm font-medium hover:bg-pink-700 transition">
            📷 FOLLOW 1.1M
          </button>
        </div>
      </div>

      {/* What's Hot */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-accent rounded"></span>
          WHAT'S HOT
        </h3>
        <div className="relative rounded overflow-hidden h-48 bg-muted">
          <img src="/trending-hot-topic.jpg" alt="Hot" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-end p-4">
            <div>
              <span className="inline-block bg-accent text-accent-foreground px-2 py-1 text-xs font-bold rounded mb-2">
                TRENDING
              </span>
              <p className="text-white font-bold text-sm">Sexy, Gender And Morality: The Unseen History Of Underwear</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Categories */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-accent rounded"></span>
          TOP CATEGORIES
        </h3>
        <div className="space-y-2">
          {["WORLD", "SPORT", "TECHNOLOGY", "LIFESTYLE"].map((cat) => (
            <button
              key={cat}
              className="w-full text-left px-4 py-2 bg-muted hover:bg-muted/80 rounded transition text-sm font-medium"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Follow on Twitter */}
      <div className="bg-blue-400 text-white rounded p-4 text-center">
        <p className="text-sm font-medium mb-3">Follow us on Twitter</p>
        <p className="text-xs mb-4">
          Get all the latest news, views and offers from the best online shopping site in India
        </p>
        <button className="bg-white text-blue-400 px-4 py-2 rounded text-sm font-bold hover:bg-gray-100 transition">
          Follow
        </button>
      </div>
    </aside>
  )
}
