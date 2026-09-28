'use client'

import { GalleryGrid } from '@/components/public/gallery-grid'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const galleryImages = [
  { id: '1', title: 'Bridal Makeup', mediaUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=500&fit=crop', mediaType: 'PHOTO' as const, category: 'Makeup' },
  { id: '2', title: 'Hair Styling', mediaUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=500&fit=crop', mediaType: 'PHOTO' as const, category: 'Hair' },
  { id: '3', title: 'Nail Art', mediaUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=500&fit=crop', mediaType: 'PHOTO' as const, category: 'Nails' },
  { id: '4', title: 'Skin Treatment', mediaUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=500&fit=crop', mediaType: 'PHOTO' as const, category: 'Skin' },
  { id: '5', title: 'Salon Interior', mediaUrl: 'https://images.unsplash.com/photo-1595476107717-8c5c9c54a55d?w=400&h=500&fit=crop', mediaType: 'PHOTO' as const, category: 'Salon' },
  { id: '6', title: 'Spa Treatment', mediaUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=500&fit=crop', mediaType: 'PHOTO' as const, category: 'Spa' },
  { id: '7', title: 'Bridal Hair', mediaUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=500&fit=crop', mediaType: 'PHOTO' as const, category: 'Bridal' },
  { id: '8', title: 'Mehndi Design', mediaUrl: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=500&fit=crop', mediaType: 'PHOTO' as const, category: 'Bridal' },
  { id: '9', title: 'Before/After Facial', mediaUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=500&fit=crop', mediaType: 'BEFORE_AFTER' as const, category: 'Skin' },
  { id: '10', title: 'Hair Color Transformation', mediaUrl: 'https://images.unsplash.com/photo-1605497788044-5a32f6eed4a2?w=400&h=500&fit=crop', mediaType: 'BEFORE_AFTER' as const, category: 'Hair' },
  { id: '11', title: 'Makeup Tutorial', mediaUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop', mediaType: 'VIDEO' as const, category: 'Makeup' },
  { id: '12', title: 'Spa Ambience', mediaUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=500&fit=crop', mediaType: 'VIDEO' as const, category: 'Spa' },
  { id: '13', title: 'Nail Extensions', mediaUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=500&fit=crop', mediaType: 'PHOTO' as const, category: 'Nails' },
  { id: '14', title: 'Men\'s Grooming', mediaUrl: 'https://images.unsplash.com/photo-1503951914875-452055bc286b?w=400&h=500&fit=crop', mediaType: 'PHOTO' as const, category: 'Hair' },
  { id: '15', title: 'Kids Haircut', mediaUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=500&fit=crop', mediaType: 'PHOTO' as const, category: 'Hair' },
  { id: '16', title: 'Waxing Results', mediaUrl: 'https://images.unsplash.com/photo-1595476107717-8c5c9c54a55d?w=400&h=500&fit=crop', mediaType: 'BEFORE_AFTER' as const, category: 'Waxing' },
]

const categories = ['All', 'Hair', 'Skin', 'Makeup', 'Bridal', 'Nails', 'Waxing', 'Spa', 'Salon']

export default function GalleryPage() {
  return (
    <div className="min-h-screen py-16 pt-20">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground mb-4">
            Our <span className="text-primary">Gallery</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A showcase of our work, transformations, and the beautiful moments we create
          </p>
        </div>

        <GalleryGrid items={galleryImages} columns={4} showCategoryFilter categories={categories.slice(1)} />

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/booking">Book Your Transformation</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}