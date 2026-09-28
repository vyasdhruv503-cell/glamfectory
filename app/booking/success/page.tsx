'use client'
export const dynamic = 'force-dynamic'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useBookingStore } from '@/stores/booking-store'
import { Button } from '@/components/ui/button'
import { Sparkles, CheckCircle, Calendar, Clock, MapPin, Phone, Mail, ShoppingBag, ArrowRight, Share2, Download, Heart } from 'lucide-react'
import Link from 'next/link'
import { cn, formatDate, formatTime, formatCurrency } from '@/lib/utils'

export default function BookingSuccessPage() {
  const router = useRouter()
  const { service, stylist, date, time, customer, getTotalPrice, getTotalDuration, reset } = useBookingStore()

  useEffect(() => {
    if (!service || !stylist || !date || !time || !customer) {
      router.push('/booking')
    }
  }, [service, stylist, date, time, customer, router])

  if (!service || !stylist || !date || !time || !customer) {
    return null
  }

  const totalPrice = getTotalPrice()
  const totalDuration = getTotalDuration()
  const finalAmount = totalPrice * 1.18
  const bookingId = 'TGF-' + Date.now().toString(36).toUpperCase()

  const handleShare = async () => {
    const text = `Booked ${service.name} with ${stylist.name} at The Glam Factory on ${formatDate(date)} at ${formatTime(time)}. Booking ID: ${bookingId}`
    if (navigator.share) {
      await navigator.share({ title: 'My Booking at The Glam Factory', text })
    } else {
      await navigator.clipboard.writeText(text)
      alert('Booking details copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen py-16 pt-20">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8 animate-pulse">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground mb-4">
            Booking <span className="text-primary">Confirmed!</span>
          </h1>

          <p className="text-muted-foreground text-lg mb-8">
            Your appointment has been successfully booked. We've sent a confirmation to your email and WhatsApp.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glam-gold-500/10 text-glam-gold-700 font-medium mb-8">
            <span className="font-mono text-lg">Booking ID: {bookingId}</span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <div className="card-elevated p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-heading font-semibold text-xl">{service.name}</p>
                <p className="text-muted-foreground">{service.duration} min • {service.category}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center mb-6">
              <div className="p-3 rounded-lg bg-glam-pink-50">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Date</p>
                <p className="font-medium">{formatDate(date)}</p>
              </div>
              <div className="p-3 rounded-lg bg-glam-pink-50">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Time</p>
                <p className="font-medium">{formatTime(time)}</p>
              </div>
              <div className="p-3 rounded-lg bg-glam-pink-50">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Duration</p>
                <p className="font-medium">{totalDuration} min</p>
              </div>
              <div className="p-3 rounded-lg bg-glam-pink-50">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Stylist</p>
                <p className="font-medium">{stylist.name}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold mb-2">
                <span>Total</span>
                <span className="text-primary">{formatCurrency(finalAmount)}</span>
              </div>
              <p className="text-sm text-muted-foreground">Pay at salon after service</p>
            </div>
          </div>

          <div className="card-elevated p-6">
            <h3 className="font-heading font-semibold text-lg mb-4 flex items-center justify-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Location & Contact
            </h3>
            <div className="space-y-3 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>The Glam Factory, 2nd Floor, Crystal Mall, Race Course Road, Vadodara - 390007</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <Phone className="h-4 w-4" />
                <a href="tel:+919876543210" className="text-primary hover:underline">+91 98765 43210</a>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@theglamfactory.in" className="text-primary hover:underline">info@theglamfactory.in</a>
              </div>
            </div>
          </div>

          <div className="card-elevated p-6 bg-glam-pink-50 border-glam-pink-200">
            <h3 className="font-heading font-semibold text-lg mb-4 flex items-center justify-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Important Reminders
            </h3>
            <ul className="space-y-2 text-sm text-left text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                Free cancellation up to 4 hours before appointment
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                Arrive 10 minutes early for consultation
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                Bring a photo ID for verification
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                Payment collected after service (Cash/UPI/Card)
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                Earn loyalty points on every visit
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/account/appointments">
                View My Appointments
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share Booking
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Save to Calendar
            </Button>
          </div>

          <div className="text-center pt-4">
            <Button variant="ghost" onClick={() => { reset(); window.location.href = '/' }}>
              <Sparkles className="mr-2 h-4 w-4" />
              Book Another Service
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}