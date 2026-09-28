'use client'

import { MembershipCard } from '@/components/public/membership-card'
import { Button } from '@/components/ui/button'
import { Check, Crown, Sparkles, Gift, Percent, Clock, Star, Shield, Heart, Truck } from 'lucide-react'
import Link from 'next/link'

const membershipPlans = [
  {
    name: 'Silver',
    description: 'Perfect for regular visits and maintenance',
    price: 5000,
    duration: 365,
    benefits: [
      '10% discount on all services',
      '2 free haircuts per year',
      'Priority booking (24hr advance)',
      'Birthday special gift worth ₹500',
      'Free consultation anytime',
      'Earn double loyalty points',
    ],
    discountPercent: 10,
    freeServices: 2,
    popular: false,
    ctaText: 'Get Silver',
  },
  {
    name: 'Gold',
    description: 'Best value for beauty enthusiasts',
    price: 12000,
    duration: 365,
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
    discountPercent: 20,
    freeServices: 4,
    popular: true,
    ctaText: 'Get Gold',
  },
  {
    name: 'Platinum',
    description: 'Ultimate luxury experience',
    price: 25000,
    duration: 365,
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
    discountPercent: 30,
    freeServices: 8,
    popular: false,
    ctaText: 'Get Platinum',
  },
]

const faqs = [
  {
    question: 'Can I upgrade my membership mid-year?',
    answer: 'Yes! You can upgrade anytime by paying the prorated difference. Your benefits upgrade immediately.',
  },
  {
    question: 'Do free services roll over to next year?',
    answer: 'Free services expire annually and don\'t roll over. We recommend using them throughout the year.',
  },
  {
    question: 'Is home service available for all areas?',
    answer: 'Home service is available within 10km radius for Gold and Platinum members. Additional charges may apply for distances beyond 5km.',
  },
  {
    question: 'Can I share my membership with family?',
    answer: 'Membership benefits are non-transferable and for personal use only. However, Platinum members get guest passes for friends/family.',
  },
  {
    question: 'What happens if I cancel my membership?',
    answer: 'Cancellations require 30 days notice. No refund for unused period. Free services used are charged at regular rates.',
  },
  {
    question: 'Are products included in the discount?',
    answer: 'Membership discounts apply to services only. Retail products have separate member pricing (usually 10-15% off).',
  },
]

export default function MembershipPage() {
  return (
    <div className="min-h-screen py-16 pt-20">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground mb-4">
            Premium <span className="text-primary">Membership</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Join our exclusive club for year-round savings, VIP perks, and priority access
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {membershipPlans.map((plan) => (
            <MembershipCard key={plan.name} {...plan} />
          ))}
        </div>

        <section className="mb-16" aria-labelledby="benefits-heading">
          <h2 id="benefits-heading" className="font-heading font-bold text-3xl text-center text-foreground mb-10">
            Why <span className="text-primary">Become a Member</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Percent, title: 'Up to 30% Off', desc: 'Save on every visit, all year round' },
              { icon: Gift, title: 'Free Services', desc: 'Complimentary services worth ₹8,000+' },
              { icon: Star, title: 'VIP Priority', desc: 'Skip the wait, book anytime' },
              { icon: Heart, title: 'Exclusive Perks', desc: 'Birthday gifts, events, and more' },
            ].map((benefit) => (
              <div key={benefit.title} className="card-elevated p-6 text-center">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-1">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16" aria-labelledby="faqs-heading">
          <h2 id="faqs-heading" className="font-heading font-bold text-3xl text-center text-foreground mb-10">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group card-elevated p-4">
                <summary className="flex items-center justify-between cursor-pointer font-medium text-foreground list-none">
                  {faq.question}
                  <svg className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-3 text-sm text-muted-foreground animate-slide-up">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-glam-pink-50 rounded-3xl p-8 md:p-12 text-center" aria-labelledby="cta-heading">
          <h2 id="cta-heading" className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Ready to <span className="text-primary">Save All Year</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
            Join 2,000+ members enjoying premium beauty at exclusive prices
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl" className="w-full sm:w-auto" asChild>
              <Link href="/contact?subject=membership">Get Membership</Link>
            </Button>
            <Button size="xl" variant="outline" className="w-full sm:w-auto" asChild>
              <a href="https://wa.me/919876543210?text=Hi%21%20I%20want%20to%20know%20about%20membership%20plans" target="_blank" rel="noopener noreferrer">
                Ask on WhatsApp
              </a>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            *Home service within 10km radius. Terms & conditions apply.
          </p>
        </section>
      </div>
    </div>
  )
}