"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  FileText,
  Music,
  Quote,
  Settings,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    // Adjust main layout margin when collapsed
    const main = document.querySelector("main")
    if (main) {
      main.classList.toggle("md:ml-64", !isCollapsed)
      main.classList.toggle("md:ml-20", isCollapsed)
    }
  }, [isCollapsed])

  const menuItems = [
    { href: "/admin", label: "Dashboard", icon: BarChart3 },
    { href: "/admin/create-post", label: "Create Post", icon: FileText },
    { href: "/admin/media", label: "Media Library", icon: Music },
    { href: "/admin/users", label: "Subscribers", icon: Users },
    { href: "/admin/quotes", label: "Quotes", icon: Quote },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex md:flex-col bg-card border-r border-border fixed h-screen transition-all duration-300 z-40 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between p-6">
          {!isCollapsed && <h2 className="text-2xl font-bold">Admin</h2>}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-muted rounded-lg transition"
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="space-y-2 flex-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                } ${isCollapsed ? "justify-center" : ""}`}
                title={isCollapsed ? item.label : ""}
              >
                <Icon size={20} />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex justify-around items-center h-20 z-50">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon size={24} />
            </Link>
          )
        })}
      </nav>
    </>
  )
}
