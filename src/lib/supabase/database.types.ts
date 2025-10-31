export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          title: string
          content: string
          post_type: string
          category: string
          image_url: string | null
          video_url: string | null
          music_url: string | null
          quote_text: string | null
          author: string | null
          user_id: string
          created_at: string
          // ...add other columns as needed
        }
        Insert: {
          // Define insert types
          title: string
          content: string
          // ...other fields
        }
        Update: {
          // Define update types
          title?: string
          content?: string
          // ...other fields
        }
      }
      // ...other tables
    }
  }
}