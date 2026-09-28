'use client'

import { Button } from '@/components/ui/button'
import { Clock, Tag, ArrowRight, Sparkles } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'

interface OfferCardProps {
  title: string
  description?: string
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SERVICE' | 'BUY_ONE_GET_ONE'
  discountValue: number
  code?: string
  minAmount?: number
  validTill: string
  imageUrl?: string
  serviceNames?: string[]
}

export function OfferCard({ title, description, discountType, discountValue, code, minAmount, validTill, imageUrl, serviceNames }: OfferCardProps) {
  const isExpired = new Date(validTill) < new Date()

  const getDiscountLabel = () => {
    switch (discountType) {
      case 'PERCENTAGE':
        return `${discountValue}% OFF`
      case 'FIXED_AMOUNT':
        return `${formatCurrency(discountValue)} OFF`
      case 'FREE_SERVICE':
        return 'FREE Service'
      case 'BUY_ONE_GET_ONE':
        return 'Buy 1 Get 1'
      default:
        return 'Special Offer'
    }
  }

  return (
    <article className={cn(
      'card-elevated overflow-hidden relative',
      isExpired && 'opacity-60'
    )}>
      <div className="relative h-48 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-glam-pink-100 to-glam-pink-50 flex items-center justify-center">
            <Sparkles className="h-12 w-12 text-glam-pink-300" />
          </div>
        )}

        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-white text-sm font-semibold">
          {getDiscountLabel()}
        </div>

        {isExpired && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium">Expired</span>
          </div>
        )}

        {code && (
          <div className="absolute bottom-3 left-3 right-3 px-3 py-2 rounded-lg bg-white/95 backdrop-blur">
            <div className="flex items-center justify-between">
              <code className="font-mono text-sm font-semibold text-foreground">{code}</code>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <svg className="h-4 w-4" onClick={() => navigator.clipboard.writeText(code)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2h-2M8 5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1" />
                </svg>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Use this code at checkout</p>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-heading font-semibold text-lg mb-2">{title}</h3>
        {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}

        {serviceNames && serviceNames.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {serviceNames.slice(0, 3).map((service) => (
              <span key={service} className="px-2 py-1 rounded-full bg-glam-pink-50 text-glam-pink-700 text-xs font-medium">
                {service}
              </span>
            ))}
            {serviceNames.length > 3 && (
              <span className="px-2 py-1 rounded-full bg-glam-pink-50 text-glam-pink-700 text-xs font-medium">
                +{serviceNames.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Valid till {new Date(validTill).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
          {minAmount && (
            <span className="flex items-center gap-1">
              <Tag className="h-4 w-4" />
              Min. {formatCurrency(minAmount)}
            </span>
          )}
        </div>

        {!isExpired && (
          <Button variant="outline" className="w-full" asChild>
            <a href="/booking">Book Now <ArrowRight className="ml-2 h-4 w-4" /></a>
          </Button>
        )}
      </div>
    </article>
  )
}