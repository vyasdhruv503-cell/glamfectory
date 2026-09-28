'use client'

import { Button } from '@/components/ui/button'
import { Sparkles, Award, Heart, Shield, Users, Leaf, Truck, Crown } from 'lucide-react'
import Link from 'next/link'

const values = [
  { icon: Heart, title: 'Personalized Care', description: 'Every client is unique. We take time to understand your needs and create customized beauty solutions.' },
  { icon: Award, title: 'Excellence', description: 'Our team of certified professionals delivers exceptional results with premium international products.' },
  { icon: Shield, title: 'Hygiene & Safety', description: 'Strict sterilization protocols, disposable tools, and hospital-grade hygiene standards.' },
  { icon: Leaf, title: 'Sustainability', description: 'Eco-friendly practices, cruelty-free products, and responsible waste management.' },
  { icon: Users, title: 'Community', description: 'Building lasting relationships with our clients and supporting local community initiatives.' },
  { icon: Crown, title: 'Luxury Experience', description: 'From ambiance to service, every detail is designed for a premium, relaxing experience.' },
]

const milestones = [
  { number: '15+', label: 'Years of Excellence' },
  { number: '25+', label: 'Expert Stylists' },
  { number: '50K+', label: 'Happy Clients' },
  { number: '100+', label: 'Services Offered' },
]

const teamStory = [
  {
    year: '2009',
    title: 'The Beginning',
    description: 'Started as a small beauty studio in Vadodara with a vision to bring premium beauty services to the city.',
  },
  {
    year: '2012',
    title: 'First Expansion',
    description: 'Moved to a larger space in Race Course Road, adding hair, skin, and bridal services.',
  },
  {
    year: '2016',
    title: 'Award Recognition',
    description: 'Won "Best Salon in Gujarat" award. Launched signature bridal packages.',
  },
  {
    year: '2019',
    title: 'Premium Rebrand',
    description: 'Rebranded as The Glam Factory. Introduced premium memberships and loyalty program.',
  },
  {
    year: '2022',
    title: 'Digital Transformation',
    description: 'Launched online booking, virtual consultations, and mobile app for seamless experience.',
  },
  {
    year: '2024',
    title: 'Today',
    description: 'Vadodara\'s leading premium beauty destination with 25+ experts and 50+ services.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 pt-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground mb-4">
            About <span className="text-primary">The Glam Factory</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Vadodara\'s premier beauty destination since 2009. Where expertise meets elegance.
          </p>
        </div>

        <section className="mb-20" aria-labelledby="story-heading">
          <h2 id="story-heading" className="font-heading font-bold text-3xl text-center text-foreground mb-12">
            Our <span className="text-primary">Story</span>
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {teamStory.map((item, index) => (
              <div key={item.year} className="flex flex-col md:flex-row gap-8 items-center md:items-start" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <span className="font-heading font-bold text-2xl text-primary">{item.year}</span>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20" aria-labelledby="values-heading">
          <h2 id="values-heading" className="font-heading font-bold text-3xl text-center text-foreground mb-12">
            Our <span className="text-primary">Values</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <div key={value.title} className="card-elevated p-6 text-center group">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <value.icon className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20" aria-labelledby="milestones-heading">
          <h2 id="milestones-heading" className="font-heading font-bold text-3xl text-center text-foreground mb-12">
            Our <span className="text-primary">Journey in Numbers</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {milestones.map((milestone) => (
              <div key={milestone.label} className="text-center">
                <div className="font-heading font-bold text-4xl sm:text-5xl text-primary mb-2">{milestone.number}</div>
                <div className="text-muted-foreground font-medium">{milestone.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-glam-pink-50 rounded-3xl p-8 md:p-16 text-center" aria-labelledby="cta-heading">
          <h2 id="cta-heading" className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Experience the <span className="text-primary">Difference</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
            Join thousands of satisfied clients who trust us for their beauty needs. Book your appointment today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl" className="w-full sm:w-auto" asChild>
              <Link href="/booking">Book Appointment</Link>
            </Button>
            <Button size="xl" variant="outline" className="w-full sm:w-auto" asChild>
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}