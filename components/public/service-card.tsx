'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Clock } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  name: string
  description?: string
  price: number
  discountPrice?: number
  duration: number
  imageUrl?: string
  category?: string
  slug: string
  popular?: boolean
}

export function ServiceCard({ name, description, price, discountPrice, duration, imageUrl, category, slug, popular }: ServiceCardProps) {
  const displayPrice = discountPrice && discountPrice < price ? discountPrice : price
  const hasDiscount = discountPrice && discountPrice < price

  return (
    <article className="card-elevated overflow-hidden group h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-glam-pink-100 to-glam-pink-50 flex items-center justify-center">
            <svg className="h-12 w-12 text-glam-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {popular && (
          <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-glam-gold-500 text-white text-xs font-medium">
            Popular
          </span>
        )}
        {hasDiscount && (
          <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-red-500 text-white text-xs font-medium">
            {Math.round(((price - displayPrice) / price) * 100)}% OFF
          </span>
        )}
        {category && (
          <span className="absolute bottom-3 left-3 px-2 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-medium text-foreground">
            {category}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
          <Link href={`/services/${slug}`}>{name}</Link>
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">{description}</p>
        )}

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {duration} min
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="font-heading font-bold text-xl text-primary">{formatCurrency(displayPrice)}</span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">{formatCurrency(price)}</span>
          )}
        </div>

        <Button variant="outline" className="w-full" asChild>
          <Link href={`/services/${slug}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </article>
  )
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}