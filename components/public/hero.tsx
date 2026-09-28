'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Award, Users, Shield } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface HeroProps {
  backgroundImage?: string
}

export function Hero({ backgroundImage }: HeroProps) {
  const stats = [
    { icon: Users, label: 'Happy Clients', value: '5000+' },
    { icon: Award, label: 'Years Experience', value: '15+' },
    { icon: Shield, label: 'Expert Stylists', value: '25+' },
    { icon: Sparkles, label: 'Services Offered', value: '50+' },
  ]

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-glam-pink-50/90 via-white/95 to-white" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-glam-pink-100/30 via-transparent to-transparent" />

      <div className="relative container-custom py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glam-pink-200 bg-glam-pink-50 text-primary text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span>Vadodara&apos;s Premium Beauty Destination</span>
          </div>

          <h1
            id="hero-heading"
            className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.1] text-foreground mb-6 animate-slide-up"
            style={{ animationDelay: '100ms' }}
          >
            THE <span className="text-primary">GLAM</span> FACTORY
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '200ms' }}>
            Experience luxury beauty services with expert stylists, premium products, and personalized care. Your transformation begins here.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <Button size="xl" className="w-full sm:w-auto" asChild>
              <Link href="/booking">
                Book Your Appointment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" className="w-full sm:w-auto" asChild>
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
            {stats.map((stat, index) => (
              <div key={stat.label} className="p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="font-heading font-bold text-2xl sm:text-3xl text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <svg className="h-6 w-6 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}