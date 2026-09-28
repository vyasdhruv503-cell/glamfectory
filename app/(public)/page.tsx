'use client'

import { Hero } from '@/components/public/hero'
import { ServiceCard } from '@/components/public/service-card'
import { TestimonialCard } from '@/components/public/testimonial-card'
import { OfferCard } from '@/components/public/offer-card'
import { GalleryGrid } from '@/components/public/gallery-grid'
import { MembershipCard } from '@/components/public/membership-card'
import { Button } from '@/components/ui/button'
import { Sparkles, Heart, Truck, Shield, Award, Scissors, Sparkle, Droplet, Crown, Gem, Flower2, Leaf, MapPin } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const featuredServices = [
  {
    name: 'Haircut & Styling',
    description: 'Precision cuts with personalized styling',
    price: 800,
    duration: 45,
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop',
    category: 'Hair',
    slug: 'haircut-styling',
    popular: true,
  },
  {
    name: 'Bridal Makeup Package',
    description: 'Complete bridal look with trial session',
    price: 15000,
    duration: 180,
    imageUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop',
    category: 'Bridal',
    slug: 'bridal-makeup-package',
    popular: true,
  },
  {
    name: 'Gold Facial',
    description: 'Anti-aging gold-infused facial treatment',
    price: 2500,
    duration: 60,
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop',
    category: 'Skin',
    slug: 'gold-facial',
  },
  {
    name: 'HD Makeup',
    description: 'High-definition makeup for events',
    price: 3500,
    duration: 90,
    imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    category: 'Makeup',
    slug: 'hd-makeup',
  },
  {
    name: 'Keratin Treatment',
    description: 'Smooth, frizz-free hair for months',
    price: 4500,
    duration: 120,
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop',
    category: 'Hair',
    slug: 'keratin-treatment',
  },
  {
    name: 'Gel Nail Extension',
    description: 'Long-lasting gel nail art designs',
    price: 1200,
    duration: 60,
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop',
    category: 'Nails',
    slug: 'gel-nail-extension',
  },
]

const whyChooseUs = [
  { icon: Award, title: 'Expert Stylists', description: '15+ years of combined experience with certified professionals' },
  { icon: Sparkle, title: 'Premium Products', description: 'Only international brands like L\'Oréal, Wella, OPI, MAC' },
  { icon: Shield, title: 'Hygiene First', description: 'Strict sterilization protocols and disposable tools' },
  { icon: Heart, title: 'Personalized Care', description: 'Custom consultations for your unique beauty needs' },
]

const testimonials = [
  {
    name: 'Priya Sharma',
    rating: 5,
    comment: 'Absolutely loved my bridal makeup! The team understood exactly what I wanted and made me feel like a princess on my big day. Highly recommend!',
    service: 'Bridal Makeup Package',
    date: 'March 2024',
  },
  {
    name: 'Anjali Patel',
    rating: 5,
    comment: 'Best hair salon in Vadodara! My keratin treatment turned my frizzy hair into silky smooth locks. The staff is so professional and friendly.',
    service: 'Keratin Treatment',
    date: 'February 2024',
  },
  {
    name: 'Riya Desai',
    rating: 5,
    comment: 'Regular customer for 3 years now. Their gold facial is amazing - my skin has never looked better. Great ambiance and service!',
    service: 'Gold Facial',
    date: 'January 2024',
  },
]

const currentOffers = [
  {
    title: 'New Client Special',
    description: 'Flat 20% off on your first visit across all services',
    discountType: 'PERCENTAGE' as const,
    discountValue: 20,
    code: 'WELCOME20',
    minAmount: 1000,
    validTill: '2024-12-31',
    serviceNames: ['Haircut', 'Facial', 'Manicure', 'Pedicure'],
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
  },
]

const galleryImages = [
  { id: '1', title: 'Bridal Makeup', mediaUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=500&fit=crop', mediaType: 'PHOTO' as const, category: 'Makeup' },
  { id: '2', title: 'Hair Styling', mediaUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=500&fit=crop', mediaType: 'PHOTO' as const, category: 'Hair' },
  { id: '3', title: 'Nail Art', mediaUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=500&fit=crop', mediaType: 'PHOTO' as const, category: 'Nails' },
  { id: '4', title: 'Skin Treatment', mediaUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=500&fit=crop', mediaType: 'PHOTO' as const, category: 'Skin' },
  { id: '5', title: 'Salon Interior', mediaUrl: 'https://images.unsplash.com/photo-1595476107717-8c5c9c54a55d?w=400&h=500&fit=crop', mediaType: 'PHOTO' as const, category: 'Salon' },
  { id: '6', title: 'Spa Treatment', mediaUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=500&fit=crop', mediaType: 'PHOTO' as const, category: 'Spa' },
]

const membershipPlans = [
  {
    name: 'Silver',
    description: 'Perfect for regular visits',
    price: 5000,
    duration: 365,
    benefits: [
      '10% discount on all services',
      '2 free haircuts per year',
      'Priority booking',
      'Birthday special gift',
      'Free consultation',
    ],
    discountPercent: 10,
    freeServices: 2,
  },
  {
    name: 'Gold',
    description: 'Best value for beauty enthusiasts',
    price: 12000,
    duration: 365,
    benefits: [
      '20% discount on all services',
      '4 free services per year',
      'Priority booking + home service',
      'Birthday makeover worth ₹3000',
      'Free monthly consultation',
      'Complimentary drink on visit',
    ],
    discountPercent: 20,
    freeServices: 4,
    popular: true,
  },
  {
    name: 'Platinum',
    description: 'Ultimate luxury experience',
    price: 25000,
    duration: 365,
    benefits: [
      '30% discount on all services',
      '8 free services per year',
      'VIP priority + home service',
      'Annual makeover worth ₹8000',
      'Free monthly premium facial',
      'Exclusive event invitations',
      'Dedicated stylist',
    ],
    discountPercent: 30,
    freeServices: 8,
  },
]

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="section-padding" aria-labelledby="services-heading">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 id="services-heading" className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
              Our <span className="text-primary">Popular Services</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our most loved beauty treatments designed to make you look and feel your best
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <ServiceCard key={service.slug} {...service} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding bg-glam-pink-50" aria-labelledby="why-heading">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 id="why-heading" className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
              Why Choose <span className="text-primary">The Glam Factory</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We believe beauty is personal. Our commitment to excellence sets us apart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <div
                key={item.title}
                className="card-elevated p-6 text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <item.icon className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="gallery-heading">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 id="gallery-heading" className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-2">
                Our <span className="text-primary">Gallery</span>
              </h2>
              <p className="text-muted-foreground">A glimpse of our work and transformations</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/gallery">View Full Gallery</Link>
            </Button>
          </div>

          <GalleryGrid items={galleryImages} columns={3} />
        </div>
      </section>

      <section className="section-padding bg-glam-pink-50" aria-labelledby="offers-heading">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 id="offers-heading" className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
              Current <span className="text-primary">Offers</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Special promotions to make your beauty journey even more rewarding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentOffers.map((offer) => (
              <OfferCard key={offer.code} {...offer} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link href="/offers">View All Offers</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="testimonials-heading">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 id="testimonials-heading" className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
              What Our <span className="text-primary">Clients Say</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real stories from our beautiful community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} featured={index === 1} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link href="/reviews">Read All Reviews</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding bg-glam-pink-50" aria-labelledby="membership-heading">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 id="membership-heading" className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
              Premium <span className="text-primary">Membership</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join our exclusive club for year-round savings and VIP perks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {membershipPlans.map((plan) => (
              <MembershipCard key={plan.name} {...plan} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="instagram-heading">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 id="instagram-heading" className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
              Follow Us on <span className="text-primary">Instagram</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Stay updated with our latest work, offers, and beauty tips
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8" role="list">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-xl group" role="listitem">
                <img
                  src={`https://images.unsplash.com/photo-1${50000000 + i * 123456}?w=300&h=300&fit=crop`}
                  alt={`Instagram post ${i}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <a href="https://instagram.com/theglamfactory" target="_blank" rel="noopener noreferrer">
                @theglamfactory
                <Sparkles className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding bg-glam-pink-50" aria-labelledby="location-heading">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="location-heading" className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
                Visit Us in <span className="text-primary">Vadodara</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Located in the heart of Vadodara at Race Course Road. Our premium salon offers a luxurious escape with ample parking and easy accessibility.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Address</h4>
                    <p className="text-sm text-muted-foreground">
                      2nd Floor, Crystal Mall, Race Course Road,<br />
                      Vadodara - 390007, Gujarat, India
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Hours</h4>
                    <p className="text-sm text-muted-foreground">
                      Mon - Sat: 10:00 AM - 8:00 PM<br />
                      Sunday: 11:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3700.123456789!2d73.181234!3d22.307123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc7c8b4a1b2c3%3A0x123456789abcdef!2sCrystal%20Mall%20Vadodara!5e0!3m2!1sen!2sin!4v1234567890123"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Glam Factory Location"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding gradient-pink text-white" aria-labelledby="cta-heading">
        <div className="container-custom text-center">
          <h2 id="cta-heading" className="font-heading font-bold text-3xl sm:text-4xl mb-4">
            Ready for Your <span className="text-glam-gold-300">Transformation</span>?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
            Book your appointment today and experience the premium beauty service you deserve.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90" asChild>
              <Link href="/booking">Book Now</Link>
            </Button>
            <Button size="xl" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}