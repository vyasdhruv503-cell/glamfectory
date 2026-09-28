'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, ArrowRight, Filter, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { cn, formatDate, formatTime, formatCurrency, getStatusColor } from '@/lib/utils'

const allAppointments = [
  { id: '1', service: 'Gold Facial', stylist: 'Dr. Meera Desai', date: '2024-12-20', time: '14:00', status: 'CONFIRMED', price: 2500, duration: 60 },
  { id: '2', service: 'Gel Manicure', stylist: 'Sneha Reddy', date: '2024-12-22', time: '11:00', status: 'SCHEDULED', price: 800, duration: 45 },
  { id: '3', service: 'Haircut & Styling', stylist: 'Priya Patel', date: '2024-11-15', time: '10:30', status: 'COMPLETED', price: 600, duration: 45 },
  { id: '4', service: 'Swedish Massage', stylist: 'Kavya Nair', date: '2024-10-28', time: '15:00', status: 'COMPLETED', price: 2000, duration: 60 },
  { id: '5', service: 'HD Makeup', stylist: 'Anjali Sharma', date: '2024-09-20', time: '16:00', status: 'COMPLETED', price: 3500, duration: 90 },
  { id: '6', service: 'Keratin Treatment', stylist: 'Priya Patel', date: '2024-08-10', time: '11:00', status: 'COMPLETED', price: 4500, duration: 120 },
  { id: '7', service: 'Bridal Makeup Trial', stylist: 'Anjali Sharma', date: '2024-07-15', time: '10:00', status: 'COMPLETED', price: 2000, duration: 60 },
  { id: '8', service: 'Diamond Facial', stylist: 'Dr. Meera Desai', date: '2024-06-25', time: '12:00', status: 'CANCELLED', price: 3500, duration: 75 },
]

const statusOptions = [
  { value: 'all', label: 'All' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'past', label: 'Past' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'SCHEDULED', label: 'Scheduled' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
]

export default function AppointmentsPage() {
  const [filter, setFilter] = useState('all')

  const filteredAppointments = allAppointments.filter((apt) => {
    const isPast = new Date(apt.date) < new Date()
    if (filter === 'all') return true
    if (filter === 'upcoming') return !isPast && apt.status !== 'CANCELLED'
    if (filter === 'past') return isPast || apt.status === 'CANCELLED'
    return apt.status === filter
  })

  const canCancel = (apt: typeof allAppointments[0]) => {
    const aptDate = new Date(`${apt.date}T${apt.time}`)
    const now = new Date()
    const diffHours = (aptDate.getTime() - now.getTime()) / (1000 * 60 * 60)
    return !['COMPLETED', 'CANCELLED', 'NO_SHOW'].includes(apt.status) && diffHours > 4
  }

  const handleCancel = (id: string) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      alert('Appointment cancelled successfully!')
    }
  }

  const handleReschedule = (id: string) => {
    alert('Redirecting to reschedule...')
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">
            My <span className="text-primary">Appointments</span>
          </h1>
          <p className="text-muted-foreground mt-1">Manage and track all your bookings</p>
        </div>
        <Button asChild size="lg">
          <Link href="/booking">
            Book New Appointment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="card-elevated">
        <div className="p-6 border-b border-glam-pink-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Filter className="h-4 w-4" />
              Filter:
            </label>
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none pr-10 pl-4 py-2 border border-glam-pink-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="divide-y divide-glam-pink-200">
          {filteredAppointments.map((apt) => (
            <div key={apt.id} className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Calendar className="h-7 w-7 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">{apt.service}</p>
                  <p className="text-sm text-muted-foreground">{apt.stylist}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium text-foreground">{formatDate(apt.date)}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{formatTime(apt.time)}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <span>{apt.duration} min</span>
                </div>
                <span className={cn('px-3 py-1 rounded-full text-xs font-medium', getStatusColor(apt.status))}>
                  {apt.status}
                </span>
              </div>

              <div className="flex items-center gap-3 sm:ml-auto">
                <div className="font-heading font-bold text-lg text-primary whitespace-nowrap">
                  {formatCurrency(apt.price)}
                </div>
                {apt.status === 'COMPLETED' && (
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/account/appointments/${apt.id}/review`}>Review</Link>
                  </Button>
                )}
                {canCancel(apt) && (
                  <>
                    <Button variant="outline" size="sm" onClick={() => handleReschedule(apt.id)}>
                      Reschedule
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleCancel(apt.id)}>
                      <XCircle className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </>
                )}
                {['COMPLETED', 'CANCELLED', 'NO_SHOW'].includes(apt.status) && (
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/booking">Re-book</Link>
                  </Button>
                )}
              </div>
            </div>
          ))}

          {filteredAppointments.length === 0 && (
            <div className="p-12 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">No appointments found</h3>
              <p className="text-muted-foreground mb-6">Try changing your filter or book a new appointment</p>
              <Button asChild>
                <Link href="/booking">Book Appointment</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}