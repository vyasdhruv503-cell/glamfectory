'use client'

import { OfferCard } from '@/components/public/offer-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const offers = [
  {
    title: 'New Client Special',
    description: 'Flat 20% off on your first visit across all services',
    discountType: 'PERCENTAGE' as const,
    discountValue: 20,
    code: 'WELCOME20',
    minAmount: 1000,
    validTill: '2024-12-31',
    serviceNames: ['Haircut', 'Facial', 'Manicure', 'Pedicure', 'Massage'],
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop',
  },
  {
    title: 'Bridal Early Bird',
    description: 'Book 3 months in advance and get free pre-bridal package worth ₹5000',
    discountType: 'FREE_SERVICE' as const,
    discountValue: 5000,
    code: 'BRIDE2024',
    minAmount: 10000,
    validTill: '2024-12-31',
    serviceNames: ['Bridal Makeup', 'Pre-Bridal Package'],
    imageUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop',
  },
  {
    title: 'Weekday Glow',
    description: '30% off on all skin treatments Monday to Wednesday',
    discountType: 'PERCENTAGE' as const,
    discountValue: 30,
    code: 'WEEKDAY30',
    minAmount: 1500,
    validTill: '2024-12-31',
    serviceNames: ['Gold Facial', 'Diamond Facial', 'Clean Up', 'Skin Polishing'],
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop',
  },
  {
    title: 'Keratin + Haircut Combo',
    description: 'Get a free haircut worth ₹800 with any keratin treatment',
    discountType: 'FREE_SERVICE' as const,
    discountValue: 800,
    code: 'KERATIN800',
    minAmount: 4500,
    validTill: '2024-12-31',
    serviceNames: ['Keratin Treatment'],
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop',
  },
  {
    title: 'Group Booking Discount',
    description: 'Book for 3+ people and get 15% off total bill',
    discountType: 'PERCENTAGE' as const,
    discountValue: 15,
    code: 'GROUP15',
    minAmount: 3000,
    validTill: '2024-12-31',
    serviceNames: ['All Services'],
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=400&fit=crop',
  },
  {
    title: 'Birthday Special',
    description: 'Free gift service worth ₹1000 on your birthday month',
    discountType: 'FIXED_AMOUNT' as const,
    discountValue: 1000,
    code: 'BDAY2024',
    minAmount: 2000,
    validTill: '2024-12-31',
    serviceNames: ['All Services'],
    imageUrl: 'https://images.unsplash.com/photo-1595476107717-8c5c9c54a55d?w=400&h=400&fit=crop',
  },
  {
    title: 'Student Discount',
    description: '15% off with valid student ID card',
    discountType: 'PERCENTAGE' as const,
    discountValue: 15,
    code: 'STUDENT15',
    minAmount: 500,
    validTill: '2024-12-31',
    serviceNames: ['Haircut', 'Clean Up', 'Manicure', 'Pedicure'],
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop',
  },
  {
    title: 'Senior Citizen Offer',
    description: '20% off for seniors (60+) on weekdays',
    discountType: 'PERCENTAGE' as const,
    discountValue: 20,
    code: 'SENIOR20',
    minAmount: 500,
    validTill: '2024-12-31',
    serviceNames: ['All Services'],
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=400&fit=crop',
  },
]

export default function OffersPage() {
  return (
    <div className="min-h-screen py-16 pt-20">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground mb-4">
            Current <span className="text-primary">Offers</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Special promotions to make your beauty journey even more rewarding
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <OfferCard key={offer.code} {...offer} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/booking">Book with Offer</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}