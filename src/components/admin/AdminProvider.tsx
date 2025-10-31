"use client"

import React from "react"
import { createClient } from "@/lib/supabase/client"
import type { Session } from '@supabase/supabase-js'

export default function AdminProvider({ 
  children,
  initialSession 
}: { 
  children: React.ReactNode
  initialSession: Session | null 
}) {
  const supabase = createClient()

  return (
    <>{children}</>
  )
}