'use client'

import { Star, Quote } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface TestimonialCardProps {
  name: string
  rating: number
  comment: string
  avatarUrl?: string
  service?: string
  date?: string
  featured?: boolean
}

export function TestimonialCard({ name, rating, comment, avatarUrl, service, date, featured }: TestimonialCardProps) {
  return (
    <article className={cn(
      'card-elevated p-6 relative overflow-hidden',
      featured && 'border-primary/50 shadow-lg shadow-primary/10'
    )}>
      {featured && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-glam-gold-500" />
      )}

      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              'h-5 w-5',
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
            )}
            aria-hidden="true"
          />
        ))}
      </div>

      <Quote className="h-8 w-8 text-primary/20 mb-4" aria-hidden="true" />

      <p className="text-foreground mb-4 leading-relaxed">"{comment}"</p>

      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-foreground">{name}</p>
          {service && <p className="text-sm text-primary">{service}</p>}
          {date && <p className="text-xs text-muted-foreground">{date}</p>}
        </div>
      </div>
    </article>
  )
}