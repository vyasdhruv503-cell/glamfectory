'use client'

import { TestimonialCard } from '@/components/public/testimonial-card'
import { Button } from '@/components/ui/button'
import { Star, Quote, MessageSquare } from 'lucide-react'
import Link from 'next/link'

const reviews = [
  {
    name: 'Priya Sharma',
    rating: 5,
    comment: 'Absolutely loved my bridal makeup! The team understood exactly what I wanted and made me feel like a princess on my big day. The trial session was so helpful and the final look was perfect. Highly recommend!',
    service: 'Bridal Makeup Package',
    date: 'March 2024',
    avatarUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=100&h=100&fit=crop',
  },
  {
    name: 'Anjali Patel',
    rating: 5,
    comment: 'Best hair salon in Vadodara! My keratin treatment turned my frizzy hair into silky smooth locks. The staff is so professional and friendly. Priya did an amazing job explaining the aftercare. Will definitely return!',
    service: 'Keratin Treatment',
    date: 'February 2024',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop',
  },
  {
    name: 'Riya Desai',
    rating: 5,
    comment: 'Regular customer for 3 years now. Their gold facial is amazing - my skin has never looked better. Great ambiance, hygienic, and the therapists really know their stuff. The membership is totally worth it!',
    service: 'Gold Facial',
    date: 'January 2024',
    avatarUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=100&h=100&fit=crop',
  },
  {
    name: 'Neha Shah',
    rating: 5,
    comment: 'Got my mehndi done for my sister\'s wedding. The artist was so patient and the design was intricate and beautiful. Lasted for 2 weeks with deep color. Reasonable prices too!',
    service: 'Bridal Mehndi',
    date: 'December 2023',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop',
  },
  {
    name: 'Kavya Reddy',
    rating: 4,
    comment: 'Good experience overall. The Swedish massage was relaxing and the therapist was skilled. Only issue was waiting 15 mins past my appointment time. But the service made up for it.',
    service: 'Swedish Massage',
    date: 'November 2023',
    avatarUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=100&h=100&fit=crop',
  },
  {
    name: 'Meera Joshi',
    rating: 5,
    comment: 'My go-to place for nails! Sneha does the most creative nail art. My gel manicure lasts 3+ weeks without chipping. Love the new membership perks - got 2 free manicures this year!',
    service: 'Gel Manicure & Nail Art',
    date: 'October 2023',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop',
  },
  {
    name: 'Aarti Mehta',
    rating: 5,
    comment: 'Booked the pre-bridal package 2 months before my wedding. Best decision ever! My skin glowed on the big day. The team customized everything for my skin type. Worth every rupee!',
    service: 'Pre-Bridal Package',
    date: 'September 2023',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop',
  },
  {
    name: 'Divya Kapoor',
    rating: 5,
    comment: 'Men\'s grooming is top-notch! Rohit gave me the perfect fade and beard shape. The scalp treatment was so relaxing. Finally found a place in Vadodara that understands men\'s styling.',
    service: 'Men\'s Haircut & Beard Trim',
    date: 'August 2023',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  {
    name: 'Sonia Verma',
    rating: 4,
    comment: 'Great HD makeup for my engagement. Anjali understood the brief perfectly. Only suggestion - the booking confirmation could be more detailed. But the makeup lasted all night!',
    service: 'HD Makeup',
    date: 'July 2023',
    avatarUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=100&h=100&fit=crop',
  },
  {
    name: 'Pooja Agarwal',
    rating: 5,
    comment: 'The diamond facial is a game changer! My skin looked radiant for my cousin\'s wedding. Dr. Meera did a thorough skin analysis first. The salon ambiance is so premium and relaxing.',
    service: 'Diamond Facial',
    date: 'June 2023',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop',
  },
]

const stats = {
  averageRating: 4.8,
  totalReviews: 1247,
  ratingBreakdown: { 5: 72, 4: 18, 3: 6, 2: 2, 1: 2 },
}

export default function ReviewsPage() {
  return (
    <div className="min-h-screen py-16 pt-20">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground mb-4">
            Client <span className="text-primary">Reviews</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Real experiences from our beautiful community
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <div className="card-elevated p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-7 w-7 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="font-heading font-bold text-5xl text-foreground">{stats.averageRating}</div>
                <div className="text-muted-foreground">{stats.totalReviews}+ reviews</div>
              </div>
              <div className="w-full md:w-1/2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-3 mb-1.5">
                    <span className="text-sm text-muted-foreground w-8">{star} Star</span>
                    <div className="flex-1 h-2 bg-glam-pink-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${stats.ratingBreakdown[star as keyof typeof stats.ratingBreakdown]}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-10 text-right">
                      {stats.ratingBreakdown[star as keyof typeof stats.ratingBreakdown]}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t">
              <Button variant="outline" className="w-full sm:w-auto" asChild>
                <a href="https://g.page/theglamfactory" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Write a Review on Google
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <TestimonialCard key={index} {...review} featured={index < 2} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/booking">Book Your Experience</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}