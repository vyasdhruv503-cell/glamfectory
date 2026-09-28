'use client'

import { Button } from '@/components/ui/button'
import { Check, Crown, Sparkles, Gift, Percent, Clock } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'

interface MembershipCardProps {
  name: string
  description?: string
  price: number
  duration: number
  benefits: string[]
  discountPercent: number
  freeServices: number
  popular?: boolean
  ctaText?: string
  onClick?: () => void
}

export function MembershipCard({ name, description, price, duration, benefits, discountPercent, freeServices, popular, ctaText = 'Get Started', onClick }: MembershipCardProps) {
  const monthlyPrice = price / (duration / 30)

  return (
    <article className={cn(
      'card-elevated p-6 relative h-full flex flex-col',
      popular && 'border-primary/50 shadow-lg shadow-primary/10'
    )}>
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-white text-sm font-medium">
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-heading font-bold text-xl">{name}</h3>
          {popular && <Crown className="h-5 w-5 text-glam-gold-500" />}
        </div>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>

      <div className="mb-6 p-4 rounded-xl bg-glam-pink-50">
        <div className="flex items-baseline gap-1 mb-1">
          <span className="font-heading font-bold text-3xl text-primary">{formatCurrency(price)}</span>
          <span className="text-muted-foreground">/ {duration} days</span>
        </div>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{formatCurrency(monthlyPrice)}</span> per month
        </p>
      </div>

      <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-glam-pink-50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Percent className="h-4 w-4 text-primary" />
          </div>
          <span className="font-medium text-sm">{discountPercent}% off on all services</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-glam-gold-500/10 flex items-center justify-center">
            <Gift className="h-4 w-4 text-glam-gold-600" />
          </div>
          <span className="font-medium text-sm">{freeServices} free services</span>
        </div>
      </div>

      <ul className="space-y-3 mb-6 flex-1" role="list">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-foreground">{benefit}</span>
          </li>
        ))}
      </ul>

      <Button
        className="w-full"
        variant={popular ? 'default' : 'outline'}
        onClick={onClick}
      >
        {ctaText}
        <Sparkles className="ml-2 h-4 w-4" />
      </Button>
    </article>
  )
}