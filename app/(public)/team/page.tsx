'use client'

import { TeamCard } from '@/components/public/team-card'

const team = [
  {
    name: 'Priya Patel',
    role: 'Senior Hair Stylist & Colorist',
    bio: 'With 12+ years of experience, Priya specializes in precision cuts, advanced color techniques, and bridal hair. Certified by L\'Oréal Professionnel.',
    experience: 12,
    specialization: ['Haircut', 'Hair Color', 'Keratin', 'Bridal Hair'],
    avgRating: 4.9,
    totalReviews: 234,
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    services: [
      { name: 'Haircut & Styling', price: 800 },
      { name: 'Hair Color', price: 2500 },
      { name: 'Keratin Treatment', price: 4500 },
    ],
  },
  {
    name: 'Anjali Sharma',
    role: 'Lead Makeup Artist',
    bio: 'Award-winning makeup artist with 10+ years in bridal, fashion, and editorial makeup. Known for her flawless airbrush technique.',
    experience: 10,
    specialization: ['Bridal Makeup', 'Airbrush', 'HD Makeup', 'Party Makeup'],
    avgRating: 4.9,
    totalReviews: 189,
    avatarUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop',
    services: [
      { name: 'Bridal Makeup', price: 15000 },
      { name: 'HD Makeup', price: 3500 },
      { name: 'Airbrush Makeup', price: 4500 },
    ],
  },
  {
    name: 'Dr. Meera Desai',
    role: 'Senior Skin Therapist',
    bio: 'Dermatology-certified skin expert with 8+ years experience. Specializes in advanced facial treatments and skin analysis.',
    experience: 8,
    specialization: ['Gold Facial', 'HydraFacial', 'Anti-Aging', 'Acne Treatment'],
    avgRating: 4.8,
    totalReviews: 156,
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
    services: [
      { name: 'Gold Facial', price: 2500 },
      { name: 'HydraFacial', price: 3000 },
      { name: 'Anti-Aging Facial', price: 3200 },
    ],
  },
  {
    name: 'Rohit Singh',
    role: 'Men\'s Grooming Specialist',
    bio: 'Expert in modern men\'s cuts, beard styling, and grooming. 7+ years creating sharp, contemporary looks.',
    experience: 7,
    specialization: ['Men\'s Haircut', 'Beard Trim', 'Hair Spa', 'Scalp Treatment'],
    avgRating: 4.7,
    totalReviews: 123,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    services: [
      { name: 'Men\'s Haircut', price: 400 },
      { name: 'Beard Trim & Shape', price: 300 },
      { name: 'Scalp Treatment', price: 1200 },
    ],
  },
  {
    name: 'Sneha Reddy',
    role: 'Nail Art Specialist',
    bio: 'Creative nail artist with 6+ years experience. Known for intricate 3D designs, gel extensions, and custom nail art.',
    experience: 6,
    specialization: ['Nail Art', 'Gel Extensions', 'Acrylic Nails', 'Spa Manicure'],
    avgRating: 4.9,
    totalReviews: 98,
    avatarUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop',
    services: [
      { name: 'Gel Manicure', price: 800 },
      { name: 'Nail Extensions', price: 2500 },
      { name: 'Nail Art', price: 1200 },
    ],
  },
  {
    name: 'Kavya Nair',
    role: 'Spa Therapist',
    bio: 'Certified spa therapist with 9+ years in therapeutic massages, body treatments, and wellness therapies.',
    experience: 9,
    specialization: ['Swedish Massage', 'Deep Tissue', 'Aromatherapy', 'Body Scrub'],
    avgRating: 4.8,
    totalReviews: 167,
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
    services: [
      { name: 'Swedish Massage', price: 2000 },
      { name: 'Deep Tissue Massage', price: 2500 },
      { name: 'Aromatherapy Massage', price: 2200 },
    ],
  },
]

export default function TeamPage() {
  return (
    <div className="min-h-screen py-16 pt-20">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground mb-4">
            Meet Our <span className="text-primary">Team</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Expert stylists, therapists, and artists dedicated to your beauty transformation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <TeamCard key={member.name} {...member} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            All our stylists are certified professionals who regularly update their skills with the latest trends and techniques.
          </p>
          <a href="/booking" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
            Book with Your Favorite Stylist
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}