'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Scissors, Sparkle, Droplet, Crown, Gem, Flower2, Leaf, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const categories = [
  { id: 'hair', name: 'Hair Services', icon: Scissors, description: 'Cuts, color, treatments & styling', services: 12, priceRange: '₹350 - ₹5,000' },
  { id: 'skin', name: 'Skin Care', icon: Sparkle, description: 'Facials, treatments & anti-aging', services: 8, priceRange: '₹800 - ₹3,500' },
  { id: 'makeup', name: 'Makeup', icon: Gem, description: 'HD, airbrush, party & bridal', services: 10, priceRange: '₹1,200 - ₹8,000' },
  { id: 'bridal', name: 'Bridal Packages', icon: Crown, description: 'Complete wedding day packages', services: 6, priceRange: '₹4,000 - ₹50,000' },
  { id: 'nails', name: 'Nail Art', icon: Flower2, description: 'Manicure, pedicure & extensions', services: 7, priceRange: '₹300 - ₹2,500' },
  { id: 'waxing', name: 'Waxing', icon: Leaf, description: 'Full body & facial waxing', services: 5, priceRange: '₹200 - ₹2,500' },
  { id: 'spa', name: 'Spa & Massage', icon: Droplet, description: 'Relaxing massages & body treatments', services: 6, priceRange: '₹800 - ₹2,500' },
]

export default function BookingPage() {
  return (
    <div className="min-h-screen py-16 pt-20">
      <div className="container-custom">
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 inline-block">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glam-pink-200 bg-glam-pink-50 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Step 1 of 6: Choose Category</span>
          </div>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground mb-4">
            What are you looking for <span className="text-primary">today</span>?
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Select a category to explore services and book your appointment
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/booking/service?category=${category.id}`}
              className={cn(
                'card-elevated p-6 h-full flex flex-col group transition-all',
                'hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50'
              )}
            >
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <category.icon className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-1">{category.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <span>{category.services} services</span>
                <span>{category.priceRange}</span>
              </div>
              <div className="mt-auto flex items-center justify-between">
                <Button variant="outline" className="w-full sm:w-auto group-hover:bg-primary group-hover:text-primary-foreground">
                  Explore Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/services">View All Services First</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}