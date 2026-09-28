'use client'

export const dynamic = 'force-dynamic'

import { useRouter, useSearchParams } from 'next/navigation'
import { useBookingStore } from '@/stores/booking-store'
import { ServiceCard } from '@/components/public/service-card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Sparkles, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const categoryServices: Record<string, any[]> = {
  hair: [
    { name: 'Haircut & Styling', description: 'Precision cuts with personalized styling', price: 800, discountPrice: 600, duration: 45, imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop', category: 'Hair', slug: 'haircut-styling', popular: true, categoryId: 'hair' },
    { name: 'Hair Color', description: 'Full color with premium L\'Oréal products', price: 2500, duration: 90, imageUrl: 'https://images.unsplash.com/photo-1605497788044-5a32f6eed4a2?w=400&h=400&fit=crop', category: 'Hair', slug: 'hair-color', categoryId: 'hair' },
    { name: 'Hair Spa', description: 'Deep conditioning treatment for damaged hair', price: 1500, duration: 60, imageUrl: 'https://images.unsplash.com/photo-1623538548678-58521b2d2d66?w=400&h=400&fit=crop', category: 'Hair', slug: 'hair-spa', categoryId: 'hair' },
    { name: 'Keratin Treatment', description: 'Smooth, frizz-free hair for months', price: 4500, duration: 120, imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop', category: 'Hair', slug: 'keratin-treatment', categoryId: 'hair' },
    { name: 'Rebonding', description: 'Permanently straight, sleek hair', price: 5000, duration: 180, imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=400&fit=crop', category: 'Hair', slug: 'rebonding', categoryId: 'hair' },
    { name: 'Blow Dry & Style', description: 'Professional blowout with styling', price: 600, duration: 30, imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=400&fit=crop', category: 'Hair', slug: 'blow-dry', categoryId: 'hair' },
    { name: 'Hair Extensions', description: 'Premium human hair extensions', price: 8000, duration: 120, imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop', category: 'Hair', slug: 'hair-extensions', categoryId: 'hair' },
    { name: 'Scalp Treatment', description: 'Therapeutic scalp massage & treatment', price: 1200, duration: 45, imageUrl: 'https://images.unsplash.com/photo-1623538548678-58521b2d2d66?w=400&h=400&fit=crop', category: 'Hair', slug: 'scalp-treatment', categoryId: 'hair' },
  ],
  skin: [
    { name: 'Gold Facial', description: 'Anti-aging gold-infused facial treatment', price: 2500, duration: 60, imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop', category: 'Skin', slug: 'gold-facial', popular: true, categoryId: 'skin' },
    { name: 'Diamond Facial', description: 'Luxury diamond dust facial for radiance', price: 3500, duration: 75, imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop', category: 'Skin', slug: 'diamond-facial', categoryId: 'skin' },
    { name: 'HydraFacial', description: 'Deep cleansing & hydration', price: 3000, duration: 60, imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop', category: 'Skin', slug: 'hydrafacial', categoryId: 'skin' },
    { name: 'Clean Up', description: 'Deep pore cleansing & exfoliation', price: 800, duration: 45, imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop', category: 'Skin', slug: 'clean-up', categoryId: 'skin' },
    { name: 'Acne Treatment', description: 'Targeted treatment for acne-prone skin', price: 2000, duration: 60, imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop', category: 'Skin', slug: 'acne-treatment', categoryId: 'skin' },
    { name: 'Anti-Aging Facial', description: 'Collagen-boosting treatment', price: 3200, duration: 75, imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop', category: 'Skin', slug: 'anti-aging-facial', categoryId: 'skin' },
    { name: 'Skin Polishing', description: 'Microdermabrasion for smooth skin', price: 1800, duration: 45, imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop', category: 'Skin', slug: 'skin-polishing', categoryId: 'skin' },
    { name: 'De-Tan Treatment', description: 'Remove tan & restore even tone', price: 1500, duration: 60, imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop', category: 'Skin', slug: 'de-tan', categoryId: 'skin' },
  ],
  makeup: [
    { name: 'HD Makeup', description: 'High-definition makeup for events', price: 3500, duration: 90, imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop', category: 'Makeup', slug: 'hd-makeup', popular: true, categoryId: 'makeup' },
    { name: 'Airbrush Makeup', description: 'Flawless airbrush finish', price: 4500, duration: 90, imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop', category: 'Makeup', slug: 'airbrush-makeup', categoryId: 'makeup' },
    { name: 'Party Makeup', description: 'Glamorous evening look', price: 2500, duration: 60, imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop', category: 'Makeup', slug: 'party-makeup', categoryId: 'makeup' },
    { name: 'Natural Makeup', description: 'Subtle, everyday elegance', price: 1800, duration: 45, imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop', category: 'Makeup', slug: 'natural-makeup', categoryId: 'makeup' },
    { name: 'Engagement Makeup', description: 'Special look for your big day', price: 4000, duration: 90, imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop', category: 'Makeup', slug: 'engagement-makeup', categoryId: 'makeup' },
    { name: 'Reception Makeup', description: 'Long-lasting party look', price: 3800, duration: 90, imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop', category: 'Makeup', slug: 'reception-makeup', categoryId: 'makeup' },
    { name: 'Bridal Makeup Trial', description: 'Trial session for brides', price: 2000, duration: 60, imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop', category: 'Makeup', slug: 'bridal-trial', categoryId: 'makeup' },
    { name: 'Eye Makeup Only', description: 'Focus on stunning eyes', price: 1200, duration: 30, imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop', category: 'Makeup', slug: 'eye-makeup', categoryId: 'makeup' },
  ],
  bridal: [
    { name: 'Bridal Makeup Package', description: 'Complete bridal look with trial session', price: 15000, duration: 180, imageUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop', category: 'Bridal', slug: 'bridal-makeup-package', popular: true, categoryId: 'bridal' },
    { name: 'Pre-Bridal Package', description: 'Skin & hair prep for the big day', price: 8000, duration: 120, imageUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop', category: 'Bridal', slug: 'pre-bridal-package', categoryId: 'bridal' },
    { name: 'Bridal Hair Styling', description: 'Traditional & contemporary updos', price: 5000, duration: 90, imageUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop', category: 'Bridal', slug: 'bridal-hair', categoryId: 'bridal' },
    { name: 'Bridal Saree Draping', description: 'Perfect draping for your look', price: 1500, duration: 30, imageUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop', category: 'Bridal', slug: 'saree-draping', categoryId: 'bridal' },
    { name: 'Mehndi Application', description: 'Intricate bridal mehndi designs', price: 3000, duration: 120, imageUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop', category: 'Bridal', slug: 'mehndi', categoryId: 'bridal' },
    { name: 'Groom\'s Package', description: 'Complete grooming for the groom', price: 4000, duration: 90, imageUrl: 'https://images.unsplash.com/photo-1503951914875-452055bc286b?w=400&h=400&fit=crop', category: 'Bridal', slug: 'grooms-package', categoryId: 'bridal' },
  ],
  nails: [
    { name: 'Gel Manicure', description: 'Long-lasting gel polish', price: 800, duration: 45, imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop', category: 'Nails', slug: 'gel-manicure', popular: true, categoryId: 'nails' },
    { name: 'Gel Pedicure', description: 'Spa pedicure with gel polish', price: 1000, duration: 60, imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop', category: 'Nails', slug: 'gel-pedicure', categoryId: 'nails' },
    { name: 'Nail Extensions', description: 'Length & strength with gel', price: 2500, duration: 90, imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop', category: 'Nails', slug: 'nail-extensions', categoryId: 'nails' },
    { name: 'Nail Art', description: 'Custom designs & 3D art', price: 1200, duration: 60, imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop', category: 'Nails', slug: 'nail-art', categoryId: 'nails' },
    { name: 'Acrylic Nails', description: 'Durable acrylic extensions', price: 2000, duration: 90, imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop', category: 'Nails', slug: 'acrylic-nails', categoryId: 'nails' },
    { name: 'Spa Manicure', description: 'Luxury hand treatment', price: 600, duration: 45, imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop', category: 'Nails', slug: 'spa-manicure', categoryId: 'nails' },
    { name: 'Spa Pedicure', description: 'Luxury foot treatment', price: 800, duration: 60, imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop', category: 'Nails', slug: 'spa-pedicure', categoryId: 'nails' },
  ],
  waxing: [
    { name: 'Full Body Wax', description: 'Complete body hair removal', price: 2500, duration: 90, imageUrl: 'https://images.unsplash.com/photo-1595476107717-8c5c9c54a55d?w=400&h=400&fit=crop', category: 'Waxing', slug: 'full-body-wax', popular: true, categoryId: 'waxing' },
    { name: 'Face Wax', description: 'Upper lip, chin, forehead', price: 300, duration: 15, imageUrl: 'https://images.unsplash.com/photo-1595476107717-8c5c9c54a55d?w=400&h=400&fit=crop', category: 'Waxing', slug: 'face-wax', categoryId: 'waxing' },
    { name: 'Underarm Wax', description: 'Smooth underarms', price: 200, duration: 10, imageUrl: 'https://images.unsplash.com/photo-1595476107717-8c5c9c54a55d?w=400&h=400&fit=crop', category: 'Waxing', slug: 'underarm-wax', categoryId: 'waxing' },
    { name: 'Arms Wax', description: 'Full or half arms', price: 500, duration: 20, imageUrl: 'https://images.unsplash.com/photo-1595476107717-8c5c9c54a55d?w=400&h=400&fit=crop', category: 'Waxing', slug: 'arms-wax', categoryId: 'waxing' },
    { name: 'Legs Wax', description: 'Full or half legs', price: 800, duration: 30, imageUrl: 'https://images.unsplash.com/photo-1595476107717-8c5c9c54a55d?w=400&h=400&fit=crop', category: 'Waxing', slug: 'legs-wax', categoryId: 'waxing' },
  ],
  spa: [
    { name: 'Swedish Massage', description: 'Relaxing full body massage', price: 2000, duration: 60, imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=400&fit=crop', category: 'Spa', slug: 'swedish-massage', popular: true, categoryId: 'spa' },
    { name: 'Deep Tissue Massage', description: 'Therapeutic muscle relief', price: 2500, duration: 60, imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=400&fit=crop', category: 'Spa', slug: 'deep-tissue-massage', categoryId: 'spa' },
    { name: 'Aromatherapy Massage', description: 'Essential oils for relaxation', price: 2200, duration: 60, imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=400&fit=crop', category: 'Spa', slug: 'aromatherapy-massage', categoryId: 'spa' },
    { name: 'Head Massage', description: 'Stress-relieving scalp massage', price: 800, duration: 30, imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=400&fit=crop', category: 'Spa', slug: 'head-massage', categoryId: 'spa' },
    { name: 'Body Scrub', description: 'Exfoliating full body polish', price: 1800, duration: 45, imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=400&fit=crop', category: 'Spa', slug: 'body-scrub', categoryId: 'spa' },
    { name: 'Body Wrap', description: 'Detoxifying & hydrating wrap', price: 2500, duration: 60, imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=400&fit=crop', category: 'Spa', slug: 'body-wrap', categoryId: 'spa' },
  ],
}

const categoryLabels: Record<string, string> = {
  hair: 'Hair Services',
  skin: 'Skin Care',
  makeup: 'Makeup',
  bridal: 'Bridal Packages',
  nails: 'Nail Art',
  waxing: 'Waxing',
  spa: 'Spa & Massage',
}

export default function BookingServicePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setCategory, setService } = useBookingStore()

  const category = searchParams.get('category') || 'hair'
  const services = categoryServices[category] || []
  const categoryLabel = categoryLabels[category] || 'Services'

  const handleSelectService = (service: any) => {
    setService({
      id: service.slug,
      name: service.name,
      price: service.discountPrice || service.price,
      duration: service.duration,
      category: service.category,
    })
    router.push('/booking/stylist')
  }

  return (
    <div className="min-h-screen py-16 pt-20">
      <div className="container-custom">
        <div className="mb-8">
          <Link href="/booking" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 inline-block">
            <ArrowLeft className="h-4 w-4" />
            Back to Categories
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glam-pink-200 bg-glam-pink-50 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Step 2 of 6: Select Service</span>
          </div>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground mb-2">
            Choose your <span className="text-primary">Service</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">{categoryLabel}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.slug}
              className="card-elevated overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50"
              onClick={() => handleSelectService(service)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                {service.popular && (
                  <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-glam-gold-500 text-white text-xs font-medium">
                    Popular
                  </span>
                )}
                {service.discountPrice && (
                  <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-red-500 text-white text-xs font-medium">
                    {Math.round(((service.price - service.discountPrice) / service.price) * 100)}% OFF
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-heading font-semibold text-lg mb-1">{service.name}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{service.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <ShoppingBag className="h-4 w-4" />
                    {service.duration} min
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading font-bold text-xl text-primary">
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(service.discountPrice || service.price)}
                  </span>
                  {service.discountPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(service.price)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No services found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}