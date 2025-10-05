"use client"

import { Button } from "@/components/ui/button"
import
    {
        Popover,
        PopoverContent,
        PopoverTrigger,
    } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { DateRange } from "react-day-picker"

type ViewMode = "days" | "months" | "years"

interface DatePickerWithRangeProps {
  value?: DateRange
  onChange: (range: DateRange | undefined) => void
  placeholder?: string
}

export function DatePickerWithRange({
  value,
  onChange,
  placeholder = "Pick a date range",
}: DatePickerWithRangeProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("days")
  const [currentDate, setCurrentDate] = useState(new Date())
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  // Normalize date to midnight for accurate comparisons
  const normalizeDate = (date: Date) => {
    const normalized = new Date(date)
    normalized.setHours(0, 0, 0, 0)
    return normalized
  }

  const formatDate = (date: Date) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  // Generate years for year view
  const startDecade = Math.floor(currentYear / 12) * 12
  const years = Array.from({ length: 12 }, (_, i) => startDecade + i)

  // Generate days for month view
  const getDaysInMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInPrevMonth = new Date(year, month, 0).getDate()
    
    const days = []
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, daysInPrevMonth - i)
      })
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i)
      })
    }
    
    // Next month days
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i)
      })
    }
    
    return days
  }

  const days = getDaysInMonth(currentYear, currentMonth)

  const handleDateClick = (date: Date) => {
    const normalizedDate = normalizeDate(date)
    
    if (!value?.from || (value.from && value.to)) {
      // Starting a new range
      onChange({ from: normalizedDate, to: undefined })
    } else {
      // Completing the range
      const normalizedFrom = normalizeDate(value.from)
      
      if (normalizedDate.getTime() === normalizedFrom.getTime()) {
        // Clicking the same date - reset
        onChange({ from: normalizedDate, to: undefined })
      } else if (normalizedDate > normalizedFrom) {
        // Normal range: from -> to
        onChange({ from: normalizedFrom, to: normalizedDate })
      } else {
        // Reverse range: swap dates
        onChange({ from: normalizedDate, to: normalizedFrom })
      }
    }
  }

  const handleMonthClick = (monthIndex: number) => {
    setCurrentDate(new Date(currentYear, monthIndex, 1))
    setViewMode("days")
  }

  const handleYearClick = (year: number) => {
    setCurrentDate(new Date(year, currentMonth, 1))
    setViewMode("months")
  }

  const isSameDay = (date1: Date, date2: Date) => {
    const d1 = normalizeDate(date1)
    const d2 = normalizeDate(date2)
    return d1.getTime() === d2.getTime()
  }

  const isDateInRange = (date: Date) => {
    if (!value?.from) return false
    
    const normalizedDate = normalizeDate(date)
    const normalizedFrom = normalizeDate(value.from)
    
    if (!value?.to) {
      return isSameDay(normalizedDate, normalizedFrom)
    }
    
    const normalizedTo = normalizeDate(value.to)
    return normalizedDate >= normalizedFrom && normalizedDate <= normalizedTo
  }

  const isDateRangeStart = (date: Date) => {
    if (!value?.from) return false
    return isSameDay(date, value.from)
  }

  const isDateRangeEnd = (date: Date) => {
    if (!value?.to) return false
    return isSameDay(date, value.to)
  }

  const navigate = (direction: "prev" | "next") => {
    if (viewMode === "days") {
      setCurrentDate(new Date(currentYear, currentMonth + (direction === "next" ? 1 : -1), 1))
    } else if (viewMode === "months") {
      setCurrentDate(new Date(currentYear + (direction === "next" ? 1 : -1), currentMonth, 1))
    } else {
      setCurrentDate(new Date(currentYear + (direction === "next" ? 12 : -12), currentMonth, 1))
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value?.from && "text-muted-foreground"
          )}
        >
          <Calendar className="mr-2 h-4 w-4" />
          {value?.from ? (
            value.to ? (
              `${formatDate(value.from)} - ${formatDate(value.to)}`
            ) : (
              formatDate(value.from)
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("prev")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => {
                if (viewMode === "days") setViewMode("months")
                else if (viewMode === "months") setViewMode("years")
              }}
              className="font-semibold"
            >
              {viewMode === "days" && `${monthNames[currentMonth]} ${currentYear}`}
              {viewMode === "months" && currentYear}
              {viewMode === "years" && `${startDecade} - ${startDecade + 11}`}
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("next")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Days View */}
          {viewMode === "days" && (
            <div>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-muted-foreground p-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {days.map((dayObj, index) => {
                  const isInRange = isDateInRange(dayObj.date)
                  const isStart = isDateRangeStart(dayObj.date)
                  const isEnd = isDateRangeEnd(dayObj.date)
                  const isSingleSelection = isStart && !value?.to
                  
                  return (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDateClick(dayObj.date)}
                      disabled={!dayObj.isCurrentMonth}
                      className={cn(
                        "h-9 w-9 p-0",
                        !dayObj.isCurrentMonth && "text-muted-foreground opacity-50",
                        isInRange && "bg-primary/20",
                        (isStart || isEnd || isSingleSelection) && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                        isStart && value?.to && "rounded-r-none",
                        isEnd && "rounded-l-none",
                        isInRange && !isStart && !isEnd && "rounded-none hover:bg-primary/30"
                      )}
                    >
                      {dayObj.day}
                    </Button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Months View */}
          {viewMode === "months" && (
            <div className="grid grid-cols-3 gap-2">
              {monthNames.map((month, index) => (
                <Button
                  key={month}
                  variant="outline"
                  size="sm"
                  onClick={() => handleMonthClick(index)}
                  className={cn(
                    "h-12",
                    index === currentMonth && "border-primary border-2"
                  )}
                >
                  {month}
                </Button>
              ))}
            </div>
          )}

          {/* Years View */}
          {viewMode === "years" && (
            <div className="grid grid-cols-3 gap-2">
              {years.map((year) => (
                <Button
                  key={year}
                  variant="outline"
                  size="sm"
                  onClick={() => handleYearClick(year)}
                  className={cn(
                    "h-12",
                    year === currentYear && "border-primary border-2"
                  )}
                >
                  {year}
                </Button>
              ))}
            </div>
          )}

          {/* Clear button */}
          {value?.from && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onChange(undefined)}
              className="w-full mt-3"
            >
              Clear
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}