"use client"

import { Search, User, Settings, Moon, Sun } from "lucide-react"
import { useState } from "react"
import { useTheme } from "./theme-provider"

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="px-4 md:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-accent">EXP</div>
            <div className="text-2xl font-bold text-foreground">NEWS</div>
          </div>

          {/* Search and Icons */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center bg-muted rounded px-3 py-2">
              <input
                type="text"
                placeholder="Enter your search"
                className="bg-transparent text-sm outline-none w-32 placeholder-muted-foreground"
              />
              <Search size={16} className="text-muted-foreground" />
            </div>
            <button className="md:hidden" onClick={() => setSearchOpen(!searchOpen)}>
              <Search size={20} />
            </button>
            <button className="p-2 hover:bg-muted rounded transition">
              <User size={20} />
            </button>
            <button className="p-2 hover:bg-muted rounded transition" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="p-2 hover:bg-muted rounded transition">
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="mt-4 flex items-center bg-muted rounded px-3 py-2 md:hidden">
            <input
              type="text"
              placeholder="Enter your search"
              className="bg-transparent text-sm outline-none w-full placeholder-muted-foreground"
            />
            <Search size={16} className="text-muted-foreground" />
          </div>
        )}
      </div>
    </header>
  )
}
