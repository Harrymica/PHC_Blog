"use client"

import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"

export function DatePicker({
  onDateSelect,
}: {
  onDateSelect?: (date: Date | null) => void
}) {
  const [date, setDate] = React.useState<Date | null>(null)
  const [month, setMonth] = React.useState<Date>(new Date())

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate || null)
    if (onDateSelect) onDateSelect(selectedDate || null)
  }

  const handleMonthChange = (newMonth: Date) => {
    setMonth(newMonth)
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value)
    const newDate = new Date(month)
    newDate.setFullYear(newYear)
    setMonth(newDate)
  }

  // Generate years for dropdown (e.g., 2000–current year + 1)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i).reverse()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 w-[220px] justify-start text-left font-normal"
        >
          <CalendarIcon className="h-4 w-4 " />
          {date ? format(date, "PPP") : <span className="max-[799px]:hidden">Pick a date</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex items-center justify-between px-3 pt-2">
          <select
            value={month.getFullYear()}
            onChange={handleYearChange}
            className="text-sm border rounded-md p-1 bg-background"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <Calendar
          mode="single"
          selected={date || undefined}
          onSelect={handleSelect}
          month={month}
          onMonthChange={handleMonthChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
