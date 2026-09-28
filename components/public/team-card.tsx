'use client'

import { Star, Instagram, MapPin } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn, formatCurrency } from '@/lib/utils'

interface TeamCardProps {
  name: string
  role: string
  bio?: string
  experience: number
  specialization: string[]
  avgRating: number
  totalReviews: number
  avatarUrl?: string
  services?: { name: string; price: number }[]
}

export function TeamCard({ name, role, bio, experience, specialization, avgRating, totalReviews, avatarUrl, services }: TeamCardProps) {
  return (
    <article className="card-elevated overflow-hidden">
      <div className="relative h-64 overflow-hidden">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-glam-pink-100 to-glam-pink-50 flex items-center justify-center">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-3xl font-heading font-bold text-primary">
                {name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-lg text-white">{name}</h3>
              <p className="text-sm text-glam-pink-100">{role}</p>
            </div>
            <div className="flex items-center gap-1 text-white">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{avgRating.toFixed(1)}</span>
              <span className="text-sm opacity-70">({totalReviews} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {bio && <p className="text-sm text-muted-foreground line-clamp-3">{bio}</p>}

        <div className="flex flex-wrap gap-2">
          {specialization.map((spec) => (
            <span key={spec} className="px-2 py-1 rounded-full bg-glam-pink-50 text-glam-pink-700 text-xs font-medium">
              {spec}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {experience}+ years exp
          </span>
        </div>

        {services && services.length > 0 && (
          <div className="space-y-2 pt-2 border-t">
            <p className="text-sm font-medium text-foreground">Popular Services:</p>
            <div className="flex flex-wrap gap-2">
              {services.slice(0, 3).map((service) => (
                <span key={service.name} className="px-2 py-1 rounded-full bg-glam-pink-50 text-glam-pink-700 text-xs font-medium">
                  {service.name} - {formatCurrency(service.price)}
                </span>
              ))}
              {services.length > 3 && (
                <span className="px-2 py-1 rounded-full bg-glam-pink-50 text-glam-pink-700 text-xs font-medium">
                  +{services.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <Button variant="outline" className="w-full" asChild>
          <a href={`/booking?stylist=${name.toLowerCase().replace(/\s+/g, '-')}`}>
            Book with {name.split(' ')[0]}
          </a>
        </Button>
      </div>
    </article>
  )
}