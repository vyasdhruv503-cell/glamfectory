'use client'

import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, MapPin, Star, Sparkles, Shield, Check } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const serviceData: Record<string, any> = {
  'haircut-styling': {
    name: 'Haircut & Styling',
    category: 'Hair',
    price: 800,
    discountPrice: 600,
    duration: 45,
    description: 'Precision cuts tailored to your face shape, hair texture, and lifestyle. Our expert stylists consult with you to create the perfect look.',
    longDescription: 'Experience a personalized haircut and styling session with our senior stylists. We begin with a thorough consultation to understand your hair goals, face shape, and daily routine. Using premium L\'Oréal Professionnel products, we cut, wash, and style your hair to perfection.',
    benefits: [
      'Personalized face-shape analysis',
      'Premium L\'Oréal Professionnel products',
      'Complimentary wash & blow-dry',
      'Styling tips for home maintenance',
      'Free touch-up within 7 days',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=400&fit=crop',
    ],
    popular: true,
  },
  'bridal-makeup-package': {
    name: 'Bridal Makeup Package',
    category: 'Bridal',
    price: 15000,
    duration: 180,
    description: 'Complete bridal transformation with trial session, wedding day makeup, and touch-up kit.',
    longDescription: 'Our signature bridal package includes a comprehensive trial session 4-6 weeks before your wedding, full bridal makeup on the big day using HD/airbrush technique, saree/lehenga draping assistance, and a custom touch-up kit. Anjali, our lead makeup artist with 10+ years experience, ensures you look flawless from morning rituals to evening reception.',
    benefits: [
      'Complimentary trial session (worth ₹2,000)',
      'HD/Airbrush makeup (long-lasting 12+ hours)',
      'Saree/lehenga draping assistance',
      'Custom touch-up kit',
      'Pre-bridal skin consultation',
      'Bridal hair styling included',
      'Mehndi design coordination',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&h=400&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    ],
    popular: true,
  },
  'gold-facial': {
    name: 'Gold Facial',
    category: 'Skin',
    price: 2500,
    duration: 60,
    description: 'Anti-aging gold-infused facial for radiant, youthful skin.',
    longDescription: 'Our signature Gold Facial uses 24K gold-infused products from Dermalogica to stimulate collagen, improve elasticity, and give an instant glow. Includes deep cleansing, exfoliation, gold mask, facial massage, and LED light therapy. Perfect before special events or as monthly maintenance.',
    benefits: [
      '24K gold-infused Dermalogica products',
      'Collagen stimulation & anti-aging',
      'LED light therapy included',
      'Relaxing facial massage',
      'Instant radiant glow',
      'Suitable for all skin types',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop',
    ],
    popular: true,
  },
  'hd-makeup': {
    name: 'HD Makeup',
    category: 'Makeup',
    price: 3500,
    duration: 90,
    description: 'High-definition makeup for events, photoshoots, and special occasions.',
    longDescription: 'Flawless HD makeup using MAC, Bobbi Brown, and Make Up For Ever products. Designed to look perfect in person and on camera. Includes skin prep, foundation matching, contouring, eye makeup, and setting spray for 8+ hour wear.',
    benefits: [
      'Camera-ready finish',
      'Premium MAC & Bobbi Brown products',
      'Custom foundation matching',
      'Waterproof & sweat-resistant',
      'Setting spray for long wear',
      'Touch-up kit included',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=400&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    ],
    popular: false,
  },
  'keratin-treatment': {
    name: 'Keratin Treatment',
    category: 'Hair',
    price: 4500,
    duration: 120,
    description: 'Smooth, frizz-free, manageable hair for 3-6 months.',
    longDescription: 'Brazilian keratin treatment using formaldehyde-free Kérastase products. Transforms frizzy, unmanageable hair into smooth, shiny, straight hair. Reduces styling time by 50%. Includes aftercare kit with sulfate-free shampoo and conditioner.',
    benefits: [
      'Formaldehyde-free Kérastase formula',
      'Lasts 3-6 months',
      'Reduces styling time 50%',
      'Aftercare kit included',
      'Suitable for colored hair',
      'Free consultation & patch test',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop',
    ],
    popular: false,
  },
  'gel-nail-extension': {
    name: 'Gel Nail Extension',
    category: 'Nails',
    price: 1200,
    duration: 60,
    description: 'Long-lasting gel extensions with custom nail art.',
    longDescription: 'Premium gel extensions using OPI and Gelish products. Choose from natural, French, or custom designs with 3D art, chrome, glitter, or encapsulated designs. Lasts 3-4 weeks with proper care. Includes cuticle care and hand massage.',
    benefits: [
      'OPI & Gelish premium gels',
      'Custom designs & 3D art available',
      'Lasts 3-4 weeks',
      'Cuticle care & hand massage',
      'Strengthens natural nails',
      'Quick LED cure (no UV damage)',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=400&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop',
    ],
    popular: false,
  },
}

export default function ServiceDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const service = serviceData[slug] || serviceData['haircut-styling']

  const displayPrice = service.discountPrice || service.price
  const hasDiscount = service.discountPrice && service.discountPrice < service.price

  return (
    <div className="min-h-screen py-16 pt-20">
      <div className="container-custom">
        <Link href="/services" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 inline-block">
          <ArrowLeft className="h-4 w-4" />
          Back to Services
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src={service.imageUrl}
              alt={service.name}
              width={600}
              height={400}
              className="w-full h-auto"
              priority
            />
            {service.popular && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-glam-gold-500 text-white text-sm font-medium">
                Popular
              </span>
            )}
            {hasDiscount && (
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-red-500 text-white text-sm font-medium">
                {Math.round(((service.price - displayPrice) / service.price) * 100)}% OFF
              </span>
            )}
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-glam-pink-100 text-glam-pink-700 text-sm font-medium">
                {service.category}
              </span>
              {service.popular && <span className="px-3 py-1 rounded-full bg-glam-gold-500 text-white text-sm font-medium">Most Popular</span>}
            </div>

            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">{service.name}</h1>

            <p className="text-lg text-muted-foreground">{service.longDescription}</p>

            <div className="flex flex-wrap items-center gap-6 pt-4 border-t">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-medium">{service.duration} min</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">4.9 (100+ reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-4 pt-4 border-t">
              <span className="font-heading font-bold text-3xl text-primary">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(displayPrice)}
              </span>
              {hasDiscount && (
                <span className="text-xl text-muted-foreground line-through">
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(service.price)}
                </span>
              )}
            </div>

            <Button size="xl" className="w-full sm:w-auto" asChild>
              <Link href="/booking">Book This Service</Link>
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="font-heading font-bold text-2xl mb-4 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                What\'s Included
              </h2>
              <ul className="space-y-3">
                {service.benefits.map((benefit: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-bold text-2xl mb-4 flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                Why Choose The Glam Factory
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Certified expert stylists',
                  'Premium international products',
                  'Strict hygiene protocols',
                  'Personalized consultation',
                  'Free touch-up within 7 days',
                  'Comfortable premium ambiance',
                ].map((reason, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </section>

            {service.gallery && service.gallery.length > 0 && (
              <section>
                <h2 className="font-heading font-bold text-2xl mb-4">Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                  {service.gallery.map((img: string, index: number) => (
                    <Image
                      key={index}
                      src={img}
                      alt={`${service.name} ${index + 1}`}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="card-elevated p-6 sticky top-24">
            <h3 className="font-heading font-semibold text-lg mb-4">Book Appointment</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-glam-pink-50">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-sm">Race Course Road, Vadodara</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-glam-pink-50">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-sm">Mon-Sat: 10AM-8PM, Sun: 11AM-6PM</span>
                </div>
              </div>
              <Button size="lg" className="w-full" asChild>
                <Link href="/booking">Book Now</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <a href="https://wa.me/919876543210?text=Hi%21%20I%20want%20to%20book%20${encodeURIComponent(service.name)}" target="_blank" rel="noopener noreferrer">
                  WhatsApp Booking
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}