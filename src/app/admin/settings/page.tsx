"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Sun, Moon } from "lucide-react"

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="mb-8">
          <Label className="text-lg font-semibold mb-4 block">Theme</Label>
          <p className="text-sm text-muted-foreground mb-4">Choose your preferred theme</p>

          <div className="flex gap-4">
            <Button 
            size="default"
              variant={theme === "light" ? "default" : "outline"}
              onClick={() => theme !== "light" && toggleTheme()}
              className="gap-2"
            >
              <Sun size={18} />
              Light
            </Button>
            <Button
            size="default"
              variant={theme === "dark" ? "default" : "outline"}
               onClick={() => theme !== "dark" && toggleTheme()}
              className="gap-2"
            >
              <Moon size={18} />
              Dark
            </Button>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="font-semibold mb-2">Current Theme</h3>
          <p className="text-sm text-muted-foreground">
            You are currently using <span className="font-semibold capitalize">{theme}</span> theme
          </p>
        </div>
      </div>
    </div>
  )
}
