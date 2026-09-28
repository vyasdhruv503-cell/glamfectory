'use client'
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useBookingStore } from '@/stores/booking-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, ArrowRight, Sparkles, User, Mail, Phone, Calendar, Clock, ShoppingBag, Sparkle } from 'lucide-react'
import Link from 'next/link'
import { cn, formatDate, formatTime, formatCurrency } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const customerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  notes: z.string().optional(),
})

type CustomerFormData = z.infer<typeof customerSchema>

export default function BookingDetailsPage() {
  const router = useRouter()
  const { service, stylist, date, time, setCustomer, getTotalPrice, getTotalDuration } = useBookingStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!service || !stylist || !date || !time) {
      router.push('/booking/datetime')
    }
  }, [service, stylist, date, time, router])

  if (!service || !stylist || !date || !time) {
    return null
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
  })

  const totalPrice = getTotalPrice()
  const totalDuration = getTotalDuration()

  const onSubmit = async (data: CustomerFormData) => {
    setIsSubmitting(true)
    setCustomer(data)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push('/booking/confirm')
  }

  return (
    <div className="min-h-screen py-16 pt-20">
      <div className="container-custom">
        <div className="mb-8">
          <Link href="/booking/datetime" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 inline-block">
            <ArrowLeft className="h-4 w-4" />
            Back to Date & Time
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glam-pink-200 bg-glam-pink-50 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Step 5 of 6: Your Details</span>
          </div>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground mb-2">
            Enter your <span className="text-primary">Details</span>
          </h1>
          <p className="text-muted-forecast max-w-2xl text-lg">
            We'll send confirmation to your email and WhatsApp
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="card-elevated p-6">
            <h3 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Personal Information
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  {...register('name')}
                  className={cn(errors.name && 'border-destructive focus:ring-destructive')}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...register('email')}
                  className={cn(errors.email && 'border-destructive focus:ring-destructive')}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  {...register('phone')}
                  className={cn(errors.phone && 'border-destructive focus:ring-destructive')}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Special Notes (Optional)</Label>
                <textarea
                  id="notes"
                  rows={3}
                  placeholder="Any allergies, preferences, or special requests..."
                  {...register('notes')}
                  className="input-field min-h-[100px]"
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    Continue to Review
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>

          <div className="card-elevated p-6 sticky top-24">
            <h3 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
              <Sparkle className="h-5 w-5 text-primary" />
              Booking Summary
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-glam-pink-50">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{service.name}</p>
                  <p className="text-sm text-muted-foreground">{stylist.name} • {stylist.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-glam-pink-50">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{formatDate(date)}</p>
                  <p className="text-sm text-muted-foreground">{formatTime(time)} • {totalDuration} min</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-glam-pink-50">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{stylist.name}</p>
                  <p className="text-sm text-muted-foreground">{stylist.role} • {stylist.avgRating}⭐ ({stylist.totalReviews}+ reviews)</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Service</span>
                <span className="font-medium">{formatCurrency(service.price)}</span>
              </div>
              {service.discountPrice && service.discountPrice < service.price && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-{formatCurrency(service.price - service.discountPrice)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (GST 18%)</span>
                <span className="font-medium">{formatCurrency(totalPrice * 0.18)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">{formatCurrency(totalPrice * 1.18)}</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Payment will be collected at the salon. Free cancellation up to 4 hours before appointment.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}