'use client'
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useBookingStore } from '@/stores/booking-store'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Sparkles, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import Link from 'next/link'
import { cn, formatDate, formatTime } from '@/lib/utils'

const timeSlots = [
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
  '19:00', '19:30'
]

const bookedSlots: Record<string, string[]> = {
  '2024-12-15': ['10:00', '11:00', '14:00', '15:30'],
  '2024-12-16': ['10:30', '12:00', '16:00'],
  '2024-12-17': ['11:00', '13:00', '17:30', '18:00'],
  '2024-12-18': ['10:00', '11:30', '14:30', '16:00'],
  '2024-12-19': ['12:00', '15:00', '18:30'],
  '2024-12-20': ['10:30', '11:00', '14:00', '17:00'],
  '2024-12-21': ['10:00', '11:30', '13:00', '16:30', '18:00'],
}

export default function BookingDateTimePage() {
  const router = useRouter()
  const { service, stylist, setDateTime, date, time } = useBookingStore()

  useEffect(() => {
    if (!service || !stylist) {
      router.push('/booking/stylist')
    }
  }, [service, stylist, router])

  if (!service || !stylist) {
    return null
  }

  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(date ? new Date(date) : null)
  const [selectedTime, setSelectedTime] = useState<string | null>(time || null)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    return { firstDay, daysInMonth, year, month }
  }

  const { firstDay, daysInMonth, year, month } = getDaysInMonth(currentMonth)

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1))

  const isDateBooked = (dateStr: string) => {
    const booked = bookedSlots[dateStr] || []
    return timeSlots.every((slot) => booked.includes(slot))
  }

  const isSlotBooked = (dateStr: string, slot: string) => {
    return (bookedSlots[dateStr] || []).includes(slot)
  }

  const handleDateSelect = (day: number) => {
    const newDate = new Date(year, month, day)
    if (newDate < today) return
    const dateStr = newDate.toISOString().split('T')[0]
    if (isDateBooked(dateStr)) return

    setSelectedDate(newDate)
    setSelectedTime(null)
  }

  const handleTimeSelect = (slot: string) => {
    const dateStr = selectedDate?.toISOString().split('T')[0]
    if (dateStr && isSlotBooked(dateStr, slot)) return
    setSelectedTime(slot)
  }

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      setDateTime(
        selectedDate.toISOString().split('T')[0],
        selectedTime
      )
      router.push('/booking/details')
    }
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const prevMonthDays = Array.from({ length: firstDay }, (_, i) => firstDay - i)

  return (
    <div className="min-h-screen py-16 pt-20">
      <div className="container-custom">
        <div className="mb-8">
          <Link href="/booking/stylist" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 inline-block">
            <ArrowLeft className="h-4 w-4" />
            Back to Stylist
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glam-pink-200 bg-glam-pink-50 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Step 4 of 6: Select Date & Time</span>
          </div>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground mb-2">
            Choose <span className="text-primary">Date & Time</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            {stylist.name} &bull; {service.name} ({service.duration} min)
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="card-elevated p-6">
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" size="icon" onClick={prevMonth} disabled={currentMonth <= today}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h2 className="font-heading font-semibold text-xl text-center flex-1">
                {monthNames[month]} {year}
              </h2>
              <Button variant="ghost" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {prevMonthDays.map((_, i) => (
                <div key={`prev-${i}`} className="aspect-square" />
              ))}
              {days.map((day) => {
                const date = new Date(year, month, day)
                const dateStr = date.toISOString().split('T')[0]
                const isPast = date < today
                const isSelected = selectedDate?.toDateString() === date.toDateString()
                const isFullyBooked = isDateBooked(dateStr)

                return (
                  <button
                    key={day}
                    onClick={() => handleDateSelect(day)}
                    disabled={isPast || isFullyBooked}
                    className={cn(
                      'aspect-square rounded-lg text-sm font-medium transition-all',
                      'hover:bg-glam-pink-100',
                      isPast && 'text-muted-foreground/30 cursor-not-allowed',
                      isFullyBooked && 'bg-red-50 text-red-400 cursor-not-allowed',
                      isSelected && 'bg-primary text-primary-foreground shadow-md',
                      (!isPast && !isFullyBooked && !isSelected) && 'text-foreground hover:bg-glam-pink-100'
                    )}
                    aria-label={dateStr}
                    aria-pressed={isSelected}
                  >
                    {day}
                    {isFullyBooked && <span className="block text-xs text-red-400 mt-1">Full</span>}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="card-elevated p-6">
            <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Available Time Slots
            </h3>

            {selectedDate ? (
              <>
                <div className="mb-4 p-3 rounded-lg bg-glam-pink-50">
                  <p className="text-sm text-muted-foreground">Selected Date:</p>
                  <p className="font-medium text-foreground">
                    {formatDate(selectedDate)} ({selectedDate.toLocaleDateString('en-IN', { weekday: 'long' })})
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-6 max-h-64 overflow-y-auto">
                  {timeSlots.map((slot) => {
                    const dateStr = selectedDate.toISOString().split('T')[0]
                    const isBooked = isSlotBooked(dateStr, slot)
                    const isSelected = selectedTime === slot

                    return (
                      <button
                        key={slot}
                        onClick={() => handleTimeSelect(slot)}
                        disabled={isBooked}
                        className={cn(
                          'px-3 py-2 rounded-lg text-sm font-medium transition-all',
                          'border',
                          isBooked && 'bg-red-50 text-red-400 border-red-200 cursor-not-allowed',
                          isSelected && 'bg-primary text-primary-foreground border-primary',
                          (!isBooked && !isSelected) && 'border-glam-pink-200 text-foreground hover:bg-glam-pink-50 hover:border-primary'
                        )}
                        aria-pressed={isSelected}
                      >
                        {slot}
                        {isBooked && <span className="ml-1 text-xs">&times;</span>}
                      </button>
                    )
                  })}
                </div>

                {timeSlots.every((slot) => isSlotBooked(selectedDate.toISOString().split('T')[0], slot)) && (
                  <p className="text-center text-sm text-red-500">All slots booked for this date</p>
                )}
              </>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Please select a date to see available time slots</p>
              </div>
            )}

            <Button
              size="lg"
              className="w-full"
              onClick={handleContinue}
              disabled={!selectedDate || !selectedTime}
            >
              <ArrowRight className="ml-2 h-4 w-4" />
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}