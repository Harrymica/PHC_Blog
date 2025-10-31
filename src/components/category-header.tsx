"use client"

import { Menu, X } from "lucide-react"
import { useState } from "react"

const categories = [
  { icon: "📰", label: "NEWS" },
  { icon: "🎯", label: "BLOG" },
  { icon: "🌍", label: "REGIONS" },
  { icon: "⚡", label: "ENERGY" },
  { icon: "🏆", label: "ELECTIONS" },
  { icon: "🎬", label: "MEDIA" },
  { icon: "🎮", label: "GAMING" },
  { icon: "⚽", label: "SPORTS" },
  { icon: "👁️", label: "WATCH" },
]

export default function CategoryHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed bottom-6 right-6 z-40 bg-accent text-accent-foreground p-3 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Category Header */}
      <nav className="hidden md:block bg-card border-b border-border sticky top-16 z-40">
        <div className="px-4 md:px-6 lg:px-8 py-0">
          <div className="flex justify-center items-center gap-0 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.label}
                className="px-4 py-3 text-sm font-medium whitespace-nowrap hover:bg-muted transition border-b-2 border-transparent hover:border-accent"
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Category Menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 md:hidden z-20" onClick={() => setIsOpen(false)} />
          <div className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border overflow-y-hidden z-30 pt-20">
            <div className="p-6 space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  className="w-full text-left px-4 py-3 rounded hover:bg-muted transition text-sm font-medium flex items-center gap-3"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}
