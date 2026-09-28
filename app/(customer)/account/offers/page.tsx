'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Calendar, Tag, Check, Sparkles, Copy, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { cn, formatDate, formatCurrency } from '@/lib/utils'

interface Offer {
  id: string
  title: string
  description: string
  discountType: string
  discountValue: number
  code: string
  minAmount: number
  validTill: string
  status: string
  serviceNames: string[]
  imageUrl: string
  usedOn?: string
}

const activeOffers: Offer[] = [
  {
    id: '1',
    title: 'Birthday Special',
    description: 'Free gift service worth ₹1000 on your birthday month',
    discountType: 'FIXED_AMOUNT',
    discountValue: 1000,
    code: 'BDAY2024',
    minAmount: 2000,
    validTill: '2024-12-31',
    status: 'ACTIVE',
    serviceNames: ['All Services'],
    imageUrl: 'https://images.unsplash.com/photo-1595476107717-8c5c9c54a55d?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    title: 'Weekday Glow',
    description: '30% off on all skin treatments Monday to Wednesday',
    discountType: 'PERCENTAGE',
    discountValue: 30,
    code: 'WEEKDAY30',
    minAmount: 1500,
    validTill: '2024-12-31',
    status: 'ACTIVE',
    serviceNames: ['Gold Facial', 'Diamond Facial', 'Clean Up', 'Skin Polishing'],
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    title: 'New Client Welcome',
    description: 'Flat 20% off on your first visit across all services',
    discountType: 'PERCENTAGE',
    discountValue: 20,
    code: 'WELCOME20',
    minAmount: 1000,
    validTill: '2024-12-31',
    status: 'ACTIVE',
    serviceNames: ['Haircut', 'Facial', 'Manicure', 'Pedicure'],
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop',
  },
]

const usedOffers = [
  {
    id: '4',
    title: 'Keratin + Haircut Combo',
    description: 'Free haircut worth ₹800 with any keratin treatment',
    discountType: 'FREE_SERVICE',
    discountValue: 800,
    code: 'KERATIN800',
    minAmount: 4500,
    validTill: '2024-11-30',
    status: 'USED',
    usedOn: '2024-11-15',
    serviceNames: ['Keratin Treatment'],
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop',
  },
  {
    id: '5',
    title: 'Group Booking Discount',
    description: '15% off for 3+ people',
    discountType: 'PERCENTAGE',
    discountValue: 15,
    code: 'GROUP15',
    minAmount: 3000,
    validTill: '2024-10-31',
    status: 'USED',
    usedOn: '2024-10-28',
    serviceNames: ['All Services'],
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=400&fit=crop',
  },
]

const expiredOffers = [
  {
    id: '6',
    title: 'Monsoon Special',
    description: '25% off on all hair treatments',
    discountType: 'PERCENTAGE',
    discountValue: 25,
    code: 'MONSOON25',
    minAmount: 2000,
    validTill: '2024-09-30',
    status: 'EXPIRED',
    serviceNames: ['Hair Spa', 'Keratin', 'Rebonding'],
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=400&fit=crop',
  },
]

const getDiscountLabel = (offer: typeof activeOffers[0]) => {
  switch (offer.discountType) {
    case 'PERCENTAGE':
      return `${offer.discountValue}% OFF`
    case 'FIXED_AMOUNT':
      return `${formatCurrency(offer.discountValue)} OFF`
    case 'FREE_SERVICE':
      return 'FREE Service'
    case 'BUY_ONE_GET_ONE':
      return 'Buy 1 Get 1'
    default:
      return 'Special Offer'
  }
}

export default function OffersPage() {
  const [tab, setTab] = useState<'active' | 'used' | 'expired'>('active')

  const tabs = [
    { id: 'active', label: 'Active', count: activeOffers.length },
    { id: 'used', label: 'Used', count: usedOffers.length },
    { id: 'expired', label: 'Expired', count: expiredOffers.length },
  ]

  const offers: Offer[] = tab === 'active' ? activeOffers : tab === 'used' ? usedOffers : expiredOffers

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    alert(`Code "${code}" copied to clipboard!`)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">
            My <span className="text-primary">Offers</span>
          </h1>
          <p className="text-muted-foreground mt-1">View and manage your promotional offers and discount codes</p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-glam-pink-200 pb-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all',
              tab === t.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-glam-pink-50'
            )}
          >
            {t.label} <span className="ml-2 px-2 py-0.5 rounded-full bg-glam-pink-100 text-primary text-xs">{t.count}</span>
          </button>
        ))}
      </div>

      {offers.length === 0 ? (
        <div className="card-elevated p-12 text-center">
          <Sparkles className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">No {tab} offers</h3>
          <p className="text-muted-foreground mb-6">Check back later for new promotions!</p>
          <Button asChild>
            <a href="/offers">Browse All Offers</a>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div key={offer.id} className={cn(
              'card-elevated overflow-hidden relative',
              offer.status === 'EXPIRED' && 'opacity-60',
              offer.status === 'USED' && 'border-glam-gold-200'
            )}>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={offer.imageUrl}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className={cn(
                    'px-3 py-1 rounded-full text-sm font-semibold',
                    offer.status === 'ACTIVE' && 'bg-primary text-primary-foreground',
                    offer.status === 'USED' && 'bg-glam-gold-500 text-white',
                    offer.status === 'EXPIRED' && 'bg-gray-500 text-white'
                  )}>
                    {getDiscountLabel(offer)}
                  </span>
                </div>
                {offer.status === 'EXPIRED' && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium">Expired</span>
                  </div>
                )}
                {offer.status === 'USED' && (
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                      Used on {offer.usedOn ? formatDate(offer.usedOn as string) : 'N/A'}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-heading font-semibold text-lg mb-2">{offer.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{offer.description}</p>

                {offer.serviceNames && offer.serviceNames.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {offer.serviceNames.slice(0, 3).map((service) => (
                      <span key={service} className="px-2 py-1 rounded-full bg-glam-pink-50 text-glam-pink-700 text-xs font-medium">
                        {service}
                      </span>
                    ))}
                    {offer.serviceNames.length > 3 && (
                      <span className="px-2 py-1 rounded-full bg-glam-pink-50 text-glam-pink-700 text-xs font-medium">
                        +{offer.serviceNames.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Valid till {formatDate(offer.validTill)}
                  </span>
                  {offer.minAmount && (
                    <span className="flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      Min. {formatCurrency(offer.minAmount)}
                    </span>
                  )}
                </div>

                {offer.code && (
                  <div className="mb-4 p-3 rounded-lg bg-glam-pink-50 border border-glam-pink-200">
                    <div className="flex items-center justify-between mb-2">
                      <code className="font-mono text-sm font-semibold text-foreground">{offer.code}</code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleCopyCode(offer.code)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Use this code at checkout</p>
                  </div>
                )}

                {offer.status === 'ACTIVE' && (
                  <Button className="w-full" asChild>
                    <a href="/booking">Book Now</a>
                  </Button>
                )}
                {offer.status === 'USED' && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/booking">Use Again</a>
                  </Button>
                )}
                {offer.status === 'EXPIRED' && (
                  <Button variant="outline" className="w-full" disabled>
                    Expired
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}