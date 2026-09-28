'use client'
export const dynamic = 'force-dynamic'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useBookingStore } from '@/stores/booking-store'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle, Calendar, Clock, User, ShoppingBag, Sparkle, CreditCard, MapPin, Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import { cn, formatDate, formatTime, formatCurrency } from '@/lib/utils'

export default function BookingConfirmPage() {
  const router = useRouter()
  const { service, stylist, date, time, customer, getTotalPrice, getTotalDuration, reset } = useBookingStore()

  useEffect(() => {
    if (!service || !stylist || !date || !time || !customer) {
      router.push('/booking/details')
    }
  }, [service, stylist, date, time, customer, router])

  if (!service || !stylist || !date || !time || !customer) {
    return null
  }

  const totalPrice = getTotalPrice()
  const totalDuration = getTotalDuration()
  const finalAmount = totalPrice * 1.18

  const handleConfirm = () => {
    // In real app, call API to create booking
    router.push('/booking/success')
  }

  return (
    <div className="min-h-screen py-16 pt-20">
      <div className="container-custom">
        <div className="mb-8">
          <Link href="/booking/details" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 inline-block">
            <ArrowLeft className="h-4 w-4" />
            Back to Details
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glam-pink-200 bg-glam-pink-50 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Step 6 of 6: Review & Confirm</span>
          </div>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground mb-2">
            Review your <span className="text-primary">Booking</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Please verify all details before confirming
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="card-elevated p-6">
              <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                Service Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{service.name}</p>
                    <p className="text-sm text-muted-foreground">{service.duration} min • {service.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{stylist.name}</p>
                    <p className="text-sm text-muted-foreground">{stylist.role} • {stylist.avgRating}⭐ ({stylist.totalReviews}+ reviews)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{formatDate(date)}</p>
                    <p className="text-sm text-muted-foreground">{formatTime(time)} • {totalDuration} min total</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-elevated p-6">
              <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Your Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">Customer</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{customer.email}</p>
                    <p className="text-sm text-muted-foreground">Email</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{customer.phone}</p>
                    <p className="text-sm text-muted-foreground">Phone</p>
                  </div>
                </div>
                {customer.notes && (
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <Sparkle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{customer.notes}</p>
                      <p className="text-sm text-muted-foreground">Special Notes</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="card-elevated p-6 sticky top-24">
            <h3 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Payment Summary
            </h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{service.name}</span>
                <span className="font-medium">{formatCurrency(service.price)}</span>
              </div>
              {service.discountPrice && service.discountPrice < service.price && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount Applied</span>
                  <span>-{formatCurrency(service.price - service.discountPrice)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">GST (18%)</span>
                <span className="font-medium">{formatCurrency(totalPrice * 0.18)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>Total Payable</span>
                <span className="text-primary">{formatCurrency(finalAmount)}</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-glam-pink-50 border border-glam-pink-200 mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-green-800">Pay at Salon</p>
                  <p className="text-sm text-green-700">No online payment required. Pay after your service.</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-glam-pink-50 border border-glam-pink-200 mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-blue-800">Location</p>
                  <p className="text-sm text-blue-700">The Glam Factory, 2nd Floor, Crystal Mall, Race Course Road, Vadodara</p>
                </div>
              </div>
            </div>

            <Button size="lg" className="w-full mb-4" onClick={handleConfirm}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Confirm Booking
            </Button>

            <Button variant="outline" className="w-full" onClick={() => reset()}>
              Start Over
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              By confirming, you agree to our <a href="/terms" className="text-primary underline">Terms & Conditions</a> and <a href="/privacy" className="text-primary underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}