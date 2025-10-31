"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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

export default function PostForm() {
  const [postType, setPostType] = useState("article")
  const [category, setCategory] = useState("Trending Post")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [musicFile, setMusicFile] = useState<File | null>(null)
  const [quoteText, setQuoteText] = useState("")
  const [author, setAuthor] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const uploadFile = async (file: File, bucket: string): Promise<string | null> => {
  if (!file) return null

  try {
    const supabase = createClient()
    
    // Check for active session before upload
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      throw new Error('Must be logged in to upload files')
    }

    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `${bucket}/${fileName}`

    const { error: uploadError, data } = await supabase.storage
      .from(bucket)
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    return publicUrl
  } catch (err: any) {
    console.error("Upload error:", err)
    throw new Error(`Failed to upload ${bucket}: ${err.message}`)
  }
}

  useEffect(() => {
          async function getUser(){
              const supabase = createClient()
          const {
            data: { user },
          } = await supabase.auth.getUser()

          if (!user) {
            setError("You must be logged in to create a post")
            setLoading(false)
            return}
          }
          getUser();
     }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)
    setUploadProgress(0)

    try {
          
        const supabase = createClient()
          const {
            data: { user },
          } = await supabase.auth.getUser()

          if (!user) {
            setError("You must be logged in to create a post")
            setLoading(false)
            return}
          

      let imageUrl = null
      let videoUrl = null
      let musicUrl = null

      if (imageFile) {
        setUploadProgress(33)
        imageUrl = await uploadFile(imageFile, "images")
      }

      if (videoFile) {
        setUploadProgress(66)
        videoUrl = await uploadFile(videoFile, "videos")
      }

      if (musicFile) {
        setUploadProgress(90)
        musicUrl = await uploadFile(musicFile, "music")
      }

      const { error: insertError } = await supabase.from("posts").insert({
        title: postType === "quote" ? quoteText : title,
        content,
        post_type: postType,
        category,
        image_url: imageUrl,
        video_url: videoUrl,
        music_url: musicUrl,
        quote_text: quoteText || null,
        author: author || null,
        user_id: user.id,
      })

      if (insertError) throw insertError

      setSuccess(true)
      setTitle("")
      setContent("")
      setCategory("Trending Post")
      setImageFile(null)
      setVideoFile(null)
      setMusicFile(null)
      setQuoteText("")
      setAuthor("")
      setUploadProgress(0)

      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message || "Failed to create post")
    } finally {
      setLoading(false)
      setUploadProgress(0)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl bg-card border border-border rounded-lg p-6">
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">Post created successfully!</div>}
      {uploadProgress > 0 && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${uploadProgress}%` }}></div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <label htmlFor="postType">Post Type</label>
        <select
          id="postType"
          value={postType}
          onChange={(e) => setPostType(e.target.value)}
          className="w-full mt-2 px-3 py-2 border border-border rounded-lg bg-background"
        >
          <option value="article">Article</option>
          <option value="quote">Quote</option>
          <option value="video">Video</option>
          <option value="music">Music</option>
          <option value="image">Image</option>
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mt-2 px-3 py-2 border border-border rounded-lg bg-background"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {postType === "quote" ? (
        <>
          <div className="mb-6">
            <label htmlFor="quoteText">Quote</label>
            <textarea
              id="quoteText"
              value={quoteText}
              onChange={(e) => setQuoteText(e.target.value)}
              required
              className="w-full mt-2 px-3 py-2 border border-border rounded-lg bg-background"
              rows={4}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="author">Author</label>
            <input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} className="mt-2" />
          </div>
        </>
      ) : (
        <>
          <div className="mb-6">
            <Label htmlFor="title" className="">Title</Label>
            <Input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-2" />
          </div>

          <div className="mb-6">
            <Label className="" htmlFor="content">Content</Label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full mt-2 px-3 py-2 border border-border rounded-lg bg-background"
              rows={6}
            />
          </div>

          {postType === "image" && (
            <div className="mb-6">
              <Label htmlFor="imageFile" className="">Upload Image</Label>
              <Input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="mt-2"
              />
            </div>
          )}

          {postType === "video" && (
            <div className="mb-6">
              <Label className="" htmlFor="videoFile">Upload Video</Label>
              <Input
                id="videoFile"
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                className="mt-2"
              />
            </div>
          )}

          {postType === "music" && (
            <div className="mb-6">
              <Label className="" htmlFor="musicFile">Upload Music</Label>
              <Input
                id="musicFile"
                type="file"
                accept="audio/*"
                onChange={(e) => setMusicFile(e.target.files?.[0] || null)}
                className="mt-2"
              />
            </div>
          )}
        </>
      )}

      <button type="submit" disabled={loading} className="w-full">
        {loading ? "Creating..." : "Create Post"}
      </button>
    </form>
  )
}
