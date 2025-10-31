"use client"

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Trash2, Edit2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Filter, ListFilter, Calendar} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {DatePicker} from "@/components/admin/DatePicker"

const CATEGORIES = [
  "Trending Post",
  "Most Recent",
  "Popular",
  "Watch Now",
  "Entertainment",
  "Live",
  "Life Styles",
  "World News",
  "Food & Recipes",
]

interface Post {
  id: string
  title: string
  post_type: string
  category: string
  image_url: string | null
  video_url: string | null
  music_url: string | null
  created_at: string
}

export default function MediaLibraryPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  // Filters
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterDate, setFilterDate] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        window.location.href = "/auth/login"
        return
      }

      setUser(user)

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching posts:", error)
      } else {
        setPosts(data || [])
        setFilteredPosts(data || [])
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  // Real-time filtering logic
  useEffect(() => {
    let filtered = [...posts]

    // Search by title
    if (searchQuery.trim()) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by post type
    if (filterType !== "all") {
      filtered = filtered.filter((p) => p.post_type === filterType)
    }

    // Filter by category
    if (filterCategory !== "all") {
      filtered = filtered.filter((p) => p.category === filterCategory)
    }

    // Filter by date
    if (filterDate) {
      filtered = filtered.filter(
        (p) => new Date(p.created_at).toDateString() === new Date(filterDate).toDateString()
      )
    }

    setFilteredPosts(filtered)
  }, [searchQuery, filterType, filterCategory, filterDate, posts])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    const supabase = createClient()
    const post = posts.find((p) => p.id === id)
    if (!post) return

    try {
      // Delete associated files
      if (post.image_url) {
        const imagePath = extractStoragePath(post.image_url)
        if (imagePath) await supabase.storage.from("images").remove([imagePath])
      }

      if (post.video_url) {
        const videoPath = extractStoragePath(post.video_url)
        if (videoPath) await supabase.storage.from("videos").remove([videoPath])
      }

      if (post.music_url) {
        const musicPath = extractStoragePath(post.music_url)
        if (musicPath) await supabase.storage.from("music").remove([musicPath])
      }

      const { error } = await supabase.from("posts").delete().eq("id", id)
      if (error) throw error

      setPosts(posts.filter((p) => p.id !== id))
    } catch (error: any) {
      alert("Error deleting post or media: " + error.message)
      console.error("Delete Error:", error)
    }
  }

  const extractStoragePath = (url: string): string | null => {
    try {
      const parts = url.split("/storage/v1/object/public/")
      if (parts.length < 2) return null
      return parts[1].split("/").slice(1).join("/")
    } catch {
      return null
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Media Library</h1>

      {/* Search and Filters */}
    <div className="flex flex-row flex-wrap md:flex-nowrap gap-4 mb-8 items-center justify-between w-full">

      {/* Search */}
      <div className="flex items-center flex-grow max-[799px]:basis-3/4">
        <Search className="text-muted-foreground mr-2" size={20} />
        <input
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Filters Container */}
      <div className="flex flex-row flex-shrink-0 justify-end gap-2 max-[799px]:basis-1/4">

        {/* Post Type Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="default" variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="max-[799px]:hidden">
                {filterType === "all" ? "All Types" : filterType}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="" align="start">
            <DropdownMenuLabel inset="default" className="">Filter by Type</DropdownMenuLabel>
            <DropdownMenuSeparator className=""/>
            {["all", "article", "quote", "video", "music", "image"].map((type) => (
              <DropdownMenuItem
                inset="default"
                
                key={type}
                onClick={() => setFilterType(type)}
                className={filterType === type ? "bg-accent" : ""}
              >
                {type === "all"
                  ? "All Types"
                  : type.charAt(0).toUpperCase() + type.slice(1)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Category Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="default" variant="outline" className="flex items-center gap-2">
              <ListFilter className="h-4 w-4" />
              <span className="max-[799px]:hidden">
                {filterCategory === "all" ? "All Categories" : filterCategory}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="" align="start">
            <label className="">Filter by Category</label>
            <DropdownMenuSeparator inset="default" className=""/>
            <DropdownMenuItem inset="default" className="" onClick={() => setFilterCategory("all")}>
              All Categories
            </DropdownMenuItem>
            {CATEGORIES.map((cat) => (
              <DropdownMenuItem
                inset="default"
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={filterCategory === cat ? "bg-accent" : ""}
              >
                {cat}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Date Filter */}
        <div className="flex items-center gap-2">
          <DatePicker
            onDateSelect={(date) => {
              setFilterDate(date ? date.toISOString() : "")
            }}
          />
          {filterDate && (
            <Button 
              size="default"
              variant="ghost"
              className="text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setFilterDate("")}
            >
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>



      {/* Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <div className="h-48 bg-muted flex items-center justify-center">
              {post.image_url && (
                <img
                  src={post.image_url || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              )}
              {post.video_url && (
                <video src={post.video_url} className="w-full h-full object-cover" controls />
              )}
              {post.music_url && (
                <div className="flex flex-col items-center gap-4 p-4">
                  <span className="text-4xl">🎵</span>
                  <audio src={post.music_url} controls className="w-full" />
                </div>
              )}
              {!post.image_url && !post.video_url && !post.music_url && (
                <span className="text-muted-foreground">{post.post_type}</span>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-bold mb-2 truncate">{post.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{post.category}</p>
              <p className="text-xs text-muted-foreground mb-4">
                {new Date(post.created_at).toLocaleDateString()}
              </p>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Edit2 size={16} className="mr-2" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleDelete(post.id)}
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found matching your filters.</p>
        </div>
      )}
    </div>
  )
}
