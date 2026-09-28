'use client'
export const dynamic = 'force-dynamic'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useBookingStore } from '@/stores/booking-store'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Star, Sparkles, Calendar, Users, Check } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const stylists = [
  {
    id: 'priya-patel',
    name: 'Priya Patel',
    role: 'Senior Hair Stylist & Colorist',
    bio: '12+ years experience. Specialist in precision cuts, advanced color, and bridal hair.',
    experience: 12,
    specialization: ['Haircut', 'Hair Color', 'Keratin', 'Bridal Hair'],
    avgRating: 4.9,
    totalReviews: 234,
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    services: ['haircut-styling', 'hair-color', 'hair-spa', 'keratin-treatment', 'rebonding', 'bridal-hair'],
  },
  {
    id: 'anjali-sharma',
    name: 'Anjali Sharma',
    role: 'Lead Makeup Artist',
    bio: 'Award-winning makeup artist with 10+ years in bridal, fashion, and editorial makeup.',
    experience: 10,
    specialization: ['Bridal Makeup', 'Airbrush', 'HD Makeup', 'Party Makeup'],
    avgRating: 4.9,
    totalReviews: 189,
    avatarUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop',
    services: ['hd-makeup', 'airbrush-makeup', 'party-makeup', 'natural-makeup', 'engagement-makeup', 'reception-makeup', 'bridal-makeup-package', 'bridal-trial'],
  },
  {
    id: 'meera-desai',
    name: 'Dr. Meera Desai',
    role: 'Senior Skin Therapist',
    bio: 'Dermatology-certified skin expert with 8+ years experience in advanced facial treatments.',
    experience: 8,
    specialization: ['Gold Facial', 'HydraFacial', 'Anti-Aging', 'Acne Treatment'],
    avgRating: 4.8,
    totalReviews: 156,
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
    services: ['gold-facial', 'diamond-facial', 'hydrafacial', 'clean-up', 'acne-treatment', 'anti-aging-facial', 'skin-polishing', 'de-tan'],
  },
  {
    id: 'rohit-singh',
    name: 'Rohit Singh',
    role: 'Men\'s Grooming Specialist',
    bio: 'Expert in modern men\'s cuts, beard styling, and grooming. 7+ years experience.',
    experience: 7,
    specialization: ['Men\'s Haircut', 'Beard Trim', 'Hair Spa', 'Scalp Treatment'],
    avgRating: 4.7,
    totalReviews: 123,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    services: ['mens-haircut', 'beard-trim', 'hair-spa', 'scalp-treatment'],
  },
  {
    id: 'sneha-reddy',
    name: 'Sneha Reddy',
    role: 'Nail Art Specialist',
    bio: 'Creative nail artist with 6+ years. Known for intricate 3D designs and gel extensions.',
    experience: 6,
    specialization: ['Nail Art', 'Gel Extensions', 'Acrylic Nails', 'Spa Manicure'],
    avgRating: 4.9,
    totalReviews: 98,
    avatarUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop',
    services: ['gel-manicure', 'gel-pedicure', 'nail-extensions', 'nail-art', 'acrylic-nails', 'spa-manicure', 'spa-pedicure'],
  },
  {
    id: 'kavya-nair',
    name: 'Kavya Nair',
    role: 'Spa Therapist',
    bio: 'Certified spa therapist with 9+ years in therapeutic massages and wellness therapies.',
    experience: 9,
    specialization: ['Swedish Massage', 'Deep Tissue', 'Aromatherapy', 'Body Scrub'],
    avgRating: 4.8,
    totalReviews: 167,
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
    services: ['swedish-massage', 'deep-tissue-massage', 'aromatherapy-massage', 'head-massage', 'body-scrub', 'body-wrap'],
  },
]

export default function BookingStylistPage() {
  const router = useRouter()
  const { service, setStylist } = useBookingStore()

  useEffect(() => {
    if (!service) {
      router.push('/booking')
    }
  }, [service, router])

  if (!service) {
    return null
  }

  const availableStylists = stylists.filter((s) => s.services.includes(service.id))

  const handleSelectStylist = (stylist: typeof stylists[0]) => {
    setStylist({
      id: stylist.id,
      name: stylist.name,
      role: stylist.role,
      avgRating: stylist.avgRating,
      totalReviews: stylist.totalReviews,
    })
    router.push('/booking/datetime')
  }

  return (
    <div className="min-h-screen py-16 pt-20">
      <div className="container-custom">
        <div className="mb-8">
          <Link href="/booking/service" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 inline-block">
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glam-pink-200 bg-glam-pink-50 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Step 3 of 6: Choose Stylist</span>
          </div>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground mb-2">
            Choose your <span className="text-primary">Stylist</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Selected: <span className="font-medium text-foreground">{service.name}</span> ({service.duration} min)
          </p>
        </div>

        {availableStylists.length === 0 ? (
          <div className="text-center py-16">
            <div className="h-20 w-20 rounded-full bg-glam-pink-100 flex items-center justify-center mx-auto mb-6">
              <Users className="h-10 w-10 text-glam-pink-400" />
            </div>
            <h3 className="font-heading font-semibold text-xl mb-2">No Specialists Available</h3>
            <p className="text-muted-foreground mb-6">No stylists specialize in this service. Please choose a different service.</p>
            <Button variant="outline" asChild>
              <Link href="/booking/service">Change Service</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableStylists.map((stylist) => (
              <div
                key={stylist.id}
                className={cn(
                  'card-elevated p-6 h-full flex flex-col cursor-pointer transition-all',
                  'hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50'
                )}
                onClick={() => handleSelectStylist(stylist)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={stylist.avatarUrl}
                    alt={stylist.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-lg">{stylist.name}</h3>
                    <p className="text-sm text-primary font-medium">{stylist.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{stylist.avgRating}</span>
                    <span className="text-sm text-muted-foreground">({stylist.totalReviews}+)</span>
                  </div>
                  <div className="flex items-center gap-1 ml-auto">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{stylist.experience}+ yrs</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">{stylist.bio}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {stylist.specialization.map((spec) => (
                    <span key={spec} className="px-2 py-1 rounded-full bg-glam-pink-50 text-glam-pink-700 text-xs font-medium">
                      {spec}
                    </span>
                  ))}
                </div>

                <Button className="w-full mt-auto" variant="outline">
                  <Check className="mr-2 h-4 w-4" />
                  Select {stylist.name.split(' ')[0]}
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Button variant="outline" size="lg" asChild>
            <Link href="/booking/service?category=any">Any Stylist is Fine</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}