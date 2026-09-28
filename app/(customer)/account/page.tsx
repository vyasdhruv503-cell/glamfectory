'use client'
export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calendar, Wallet, CreditCard, Tag, Sparkles, ArrowRight, CheckCircle, Clock } from 'lucide-react'
import { cn, formatCurrency, formatDate, formatTime } from '@/lib/utils'

const upcomingAppointments = [
  { id: '1', service: 'Gold Facial', stylist: 'Dr. Meera Desai', date: '2024-12-20', time: '14:00', status: 'CONFIRMED', price: 2500 },
  { id: '2', service: 'Gel Manicure', stylist: 'Sneha Reddy', date: '2024-12-22', time: '11:00', status: 'SCHEDULED', price: 800 },
]

const recentAppointments = [
  { id: '3', service: 'Haircut & Styling', stylist: 'Priya Patel', date: '2024-11-15', status: 'COMPLETED', price: 600 },
  { id: '4', service: 'Swedish Massage', stylist: 'Kavya Nair', date: '2024-10-28', status: 'COMPLETED', price: 2000 },
]

const loyaltyData = {
  points: 2450,
  tier: 'Gold',
  nextTier: 'Platinum',
  pointsToNext: 550,
  walletBalance: 1200,
}

const membershipData = {
  plan: 'Gold',
  expiry: '2025-03-15',
  discount: 20,
  freeServicesUsed: 2,
  freeServicesTotal: 4,
}

const activeOffers = [
  { title: 'Birthday Special', code: 'BDAY2024', discount: '₹1000 off', expiry: '2024-12-31' },
  { title: 'Weekday Glow', code: 'WEEKDAY30', discount: '30% off skin', expiry: '2024-12-31' },
]

export default function AccountOverviewPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">
            Welcome back, <span className="text-primary">Priya</span>!
          </h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your account</p>
        </div>
        <Button asChild size="lg">
          <Link href="/booking">
            Book New Appointment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Loyalty Points</p>
              <p className="font-heading font-bold text-3xl text-primary mt-1">{loyaltyData.points.toLocaleString()}</p>
            </div>
            <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-7 w-7 text-primary" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">Tier: <span className="font-medium text-foreground">{loyaltyData.tier}</span></p>
            <div className="mt-2 h-2 bg-glam-pink-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${(loyaltyData.points / 3000) * 100}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{loyaltyData.pointsToNext} points to {loyaltyData.nextTier}</p>
          </div>
        </div>

        <div className="card-elevated p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Wallet Balance</p>
              <p className="font-heading font-bold text-3xl text-foreground mt-1">{formatCurrency(loyaltyData.walletBalance)}</p>
            </div>
            <div className="h-14 w-14 rounded-xl bg-glam-gold-500/10 flex items-center justify-center">
              <Wallet className="h-7 w-7 text-glam-gold-600" />
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4" asChild>
            <Link href="/account/loyalty">View Transactions</Link>
          </Button>
        </div>

        <div className="card-elevated p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Membership</p>
              <p className="font-heading font-bold text-3xl text-primary mt-1">{membershipData.plan}</p>
            </div>
            <div className="h-14 w-14 rounded-xl bg-glam-gold-500/10 flex items-center justify-center">
              <CreditCard className="h-7 w-7 text-glam-gold-600" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Expires</span>
              <span className="font-medium">{formatDate(membershipData.expiry)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Free services</span>
              <span className="font-medium">{membershipData.freeServicesUsed}/{membershipData.freeServicesTotal} used</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Discount</span>
              <span className="font-medium text-green-600">{membershipData.discount}% off</span>
            </div>
          </div>
        </div>

        <div className="card-elevated p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Offers</p>
              <p className="font-heading font-bold text-3xl text-foreground mt-1">{activeOffers.length}</p>
            </div>
            <div className="h-14 w-14 rounded-xl bg-glam-pink-100 flex items-center justify-center">
              <Tag className="h-7 w-7 text-primary" />
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4" asChild>
            <Link href="/account/offers">View All Offers</Link>
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-elevated">
          <div className="p-6 border-b border-glam-pink-200 flex items-center justify-between">
            <h2 className="font-heading font-semibold text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Appointments
            </h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/account/appointments">View All</Link>
            </Button>
          </div>
          <div className="divide-y divide-glam-pink-200">
            {upcomingAppointments.map((apt) => (
              <div key={apt.id} className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Calendar className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{apt.service}</p>
                    <p className="text-sm text-muted-foreground">{apt.stylist}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(apt.date)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{formatTime(apt.time)}</span>
                  </div>
                  <span className={cn(
                    'px-3 py-1 rounded-full text-xs font-medium',
                    apt.status === 'CONFIRMED' && 'bg-blue-100 text-blue-800',
                    apt.status === 'SCHEDULED' && 'bg-yellow-100 text-yellow-800',
                    apt.status === 'COMPLETED' && 'bg-green-100 text-green-800'
                  )}>
                    {apt.status}
                  </span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/account/appointments/${apt.id}`}>Manage</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {upcomingAppointments.length === 0 && (
            <div className="p-12 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No upcoming appointments</p>
              <Button asChild>
                <Link href="/booking">Book Your First Appointment</Link>
              </Button>
            </div>
          )}
        </div>

        <div className="card-elevated">
          <div className="p-6 border-b border-glam-pink-200 flex items-center justify-between">
            <h2 className="font-heading font-semibold text-lg flex items-center gap-2">
              <Tag className="h-5 w-5 text-primary" />
              Your Active Offers
            </h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/account/offers">View All</Link>
            </Button>
          </div>
          <div className="divide-y divide-glam-pink-200">
            {activeOffers.map((offer) => (
              <div key={offer.code} className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="font-medium text-foreground">{offer.title}</p>
                  <p className="text-sm text-primary font-medium">{offer.discount} • Code: {offer.code}</p>
                  <p className="text-xs text-muted-foreground">Expires: {formatDate(offer.expiry)}</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/booking">Use Offer</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card-elevated p-6 bg-gradient-to-r from-glam-pink-50 to-white border-glam-pink-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h3 className="font-heading font-semibold text-lg mb-1">Refer a Friend, Get Rewarded!</h3>
            <p className="text-sm text-muted-foreground">Share your referral code and earn ₹100 for each friend who books.</p>
          </div>
          <Button asChild>
            <Link href="/account/referrals">
              View Referral Code
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}