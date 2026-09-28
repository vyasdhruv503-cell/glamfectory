'use client'

import { Button } from '@/components/ui/button'
import { Calendar, CheckCircle, CreditCard, Gift, Sparkles, ArrowRight, Crown, Shield, Users, Clock } from 'lucide-react'
import { cn, formatDate, formatCurrency } from '@/lib/utils'
import Link from 'next/link'

const membershipData = {
  plan: 'Gold',
  startDate: '2024-03-15',
  expiryDate: '2025-03-15',
  autoRenew: true,
  status: 'ACTIVE',
  discount: 20,
  freeServicesUsed: 2,
  freeServicesTotal: 4,
  totalSavings: 15600,
}

const allPlans = [
  {
    name: 'Silver',
    price: 5000,
    duration: 365,
    discount: 10,
    freeServices: 2,
    benefits: [
      '10% discount on all services',
      '2 free haircuts per year',
      'Priority booking (24hr advance)',
      'Birthday special gift worth ₹500',
      'Free consultation anytime',
      'Earn double loyalty points',
    ],
    popular: false,
  },
  {
    name: 'Gold',
    price: 12000,
    duration: 365,
    discount: 20,
    freeServices: 4,
    benefits: [
      '20% discount on all services',
      '4 free services per year (any)',
      'Priority booking + home service*',
      'Birthday makeover worth ₹3,000',
      'Free monthly consultation',
      'Complimentary drink on visit',
      'Earn triple loyalty points',
      'Exclusive event invitations',
    ],
    popular: true,
  },
  {
    name: 'Platinum',
    price: 25000,
    duration: 365,
    discount: 30,
    freeServices: 8,
    benefits: [
      '30% discount on all services',
      '8 free services per year (any)',
      'VIP priority + home service*',
      'Annual makeover worth ₹8,000',
      'Free monthly premium facial',
      'Exclusive event invitations',
      'Dedicated stylist assignment',
      'Earn 4x loyalty points',
      'Free parking validation',
      'Guest passes (2 per quarter)',
    ],
    popular: false,
  },
]

const usageHistory = [
  { date: '2024-11-15', service: 'Haircut & Styling', type: 'Free Service', value: 600 },
  { date: '2024-10-28', service: 'Swedish Massage', type: 'Free Service', value: 2000 },
  { date: '2024-10-15', service: 'Gold Facial', type: 'Discount', value: 500 },
  { date: '2024-09-20', service: 'HD Makeup', type: 'Discount', value: 700 },
  { date: '2024-08-10', service: 'Keratin Treatment', type: 'Discount', value: 900 },
  { date: '2024-07-15', service: 'Bridal Makeup Trial', type: 'Discount', value: 400 },
]

export default function MembershipPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">
            My <span className="text-primary">Membership</span>
          </h1>
          <p className="text-muted-foreground mt-1">Manage your premium membership plan</p>
        </div>
      </div>

      <div className="card-elevated p-6 md:grid md:grid-cols-2 gap-8">
        <div className={cn(
          'relative',
          membershipData.plan === 'Gold' && 'border-primary/50 shadow-lg shadow-primary/10'
        )}>
          {membershipData.plan === 'Gold' && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-white text-sm font-medium">
              Current Plan
            </div>
          )}
          <div className="flex items-start gap-4 mb-6">
            <div className={cn(
              'h-20 w-20 rounded-2xl flex items-center justify-center',
              membershipData.plan === 'Gold' && 'bg-glam-gold-500',
              membershipData.plan === 'Silver' && 'bg-gray-300',
              membershipData.plan === 'Platinum' && 'bg-purple-600'
            )}>
              <span className="font-heading font-bold text-3xl text-white">{membershipData.plan.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <h2 className="font-heading font-bold text-3xl">{membershipData.plan} Member</h2>
              <span className={cn(
                'px-3 py-1 rounded-full text-sm font-medium',
                membershipData.status === 'ACTIVE' && 'bg-green-100 text-green-800'
              )}>
                {membershipData.status}
              </span>
            </div>
          </div>

          <div className="space-y-3 mb-6 p-4 rounded-xl bg-glam-pink-50">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Started</p>
                <p className="font-medium">{formatDate(membershipData.startDate)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Expires</p>
                <p className="font-medium">{formatDate(membershipData.expiryDate)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Auto-renew</p>
                <p className="font-medium">{membershipData.autoRenew ? 'Enabled' : 'Disabled'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Savings</p>
                <p className="font-heading font-bold text-primary">{formatCurrency(membershipData.totalSavings)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Discount on services</span>
              <span className="font-medium text-green-600">{membershipData.discount}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Free services used</span>
              <span className="font-medium">{membershipData.freeServicesUsed}/{4}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Days remaining</span>
              <span className="font-medium">
                {Math.ceil((new Date(membershipData.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
              </span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/account/membership/manage">Manage Plan</Link>
            </Button>
            <Button className="flex-1" asChild>
              <Link href="/account/membership/billing">Billing History</Link>
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-elevated p-6">
            <h3 className="font-heading font-semibold text-lg mb-4">Your Benefits</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                '20% discount on all services',
                '4 free services per year',
                'Priority booking + home service',
                'Birthday makeover worth ₹3,000',
                'Free monthly consultation',
                'Complimentary drink on visit',
                'Triple loyalty points',
                'Exclusive event invitations',
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 p-3 rounded-lg bg-glam-pink-50">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-sm text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-elevated p-6">
            <h3 className="font-heading font-semibold text-lg mb-4">Usage This Year</h3>
            <div className="divide-y divide-glam-pink-200">
              {[
                { label: 'Free Services Used', value: '2 / 4', color: 'text-glam-gold-600' },
                { label: 'Total Discounts Availed', value: '₹4,200', color: 'text-green-600' },
                { label: 'Appointments Booked', value: '12', color: 'text-primary' },
                { label: 'Loyalty Points Earned', value: '2,450', color: 'text-glam-gold-600' },
                { label: 'Wallet Transactions', value: '8', color: 'text-glam-gold-600' },
              ].map((stat) => (
                <div key={stat.label} className="py-3 flex justify-between">
                  <span className="text-muted-foreground">{stat.label}</span>
                  <span className={cn('font-semibold', stat.color)}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card-elevated">
        <div className="p-6 border-b border-glam-pink-200">
          <h3 className="font-heading font-semibold text-lg">Usage History</h3>
        </div>
        <div className="divide-y divide-glam-pink-200">
          {[
            { date: '2024-11-15', service: 'Haircut & Styling', type: 'Free Service', value: 600 },
            { date: '2024-10-28', service: 'Swedish Massage', type: 'Free Service', value: 2000 },
            { date: '2024-10-15', service: 'Gold Facial', type: 'Discount', value: 500 },
            { date: '2024-09-20', service: 'HD Makeup', type: 'Discount', value: 700 },
            { date: '2024-08-10', service: 'Keratin Treatment', type: 'Discount', value: 900 },
            { date: '2024-07-15', service: 'Bridal Makeup Trial', type: 'Discount', value: 400 },
          ].map((usage) => (
            <div key={usage.date} className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-glam-pink-100 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{usage.service}</p>
                  <p className="text-sm text-muted-foreground">{formatDate(usage.date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className={cn(
                  'px-3 py-1 rounded-full text-xs font-medium',
                  usage.type === 'Free Service' ? 'bg-glam-gold-100 text-glam-gold-800' : 'bg-green-100 text-green-800'
                )}>
                  {usage.type}
                </span>
                <span className="font-semibold text-foreground">{formatCurrency(usage.value)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-elevated p-6 bg-glam-pink-50 border-glam-pink-200">
        <h3 className="font-heading font-semibold text-lg mb-4">Upgrade to Platinum</h3>
        <p className="text-muted-foreground mb-6">Unlock 30% discount, 8 free services/year, dedicated stylist, and VIP perks.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild>
            <Link href="/account/membership/upgrade">Upgrade Now</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/membership">View All Plans</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}