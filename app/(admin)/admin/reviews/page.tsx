'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Star, Check, X, Filter, ChevronDown, MessageSquare, Eye } from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'

const reviews = [
  { id: '1', customer: 'Priya Sharma', email: 'priya@email.com', service: 'Bridal Makeup Package', stylist: 'Anjali Sharma', rating: 5, comment: 'Absolutely loved my bridal makeup! The team understood exactly what I wanted and made me feel like a princess on my big day. Highly recommend!', date: '2024-03-15', isApproved: true, isFeatured: true },
  { id: '2', customer: 'Anjali Patel', email: 'anjali@email.com', service: 'Keratin Treatment', stylist: 'Priya Patel', rating: 5, comment: 'Best hair salon in Vadodara! My keratin treatment turned my frizzy hair into silky smooth locks. The staff is so professional and friendly.', date: '2024-02-28', isApproved: true, isFeatured: true },
  { id: '3', customer: 'Riya Desai', email: 'riya@email.com', service: 'Gold Facial', stylist: 'Dr. Meera Desai', rating: 5, comment: 'Regular customer for 3 years now. Their gold facial is amazing - my skin has never looked better. Great ambiance and service!', date: '2024-01-20', isApproved: true, isFeatured: true },
  { id: '4', customer: 'Neha Shah', email: 'neha@email.com', service: 'HD Makeup', stylist: 'Anjali Sharma', rating: 4, comment: 'Great HD makeup for my engagement. Anjali understood the brief perfectly. Only suggestion - the booking confirmation could be more detailed.', date: '2024-02-10', isApproved: true, isFeatured: false },
  { id: '5', customer: 'Pooja Agarwal', email: 'pooja@email.com', service: 'Diamond Facial', stylist: 'Dr. Meera Desai', rating: 5, comment: 'The diamond facial is a game changer! My skin looked radiant for my cousin\'s wedding. Dr. Meera did a thorough skin analysis first.', date: '2024-01-05', isApproved: false, isFeatured: false },
  { id: '6', customer: 'Divya Kapoor', email: 'divya@email.com', service: 'Swedish Massage', stylist: 'Kavya Nair', rating: 4, comment: 'Good experience overall. The Swedish massage was relaxing and the therapist was skilled. Only issue was waiting 15 mins past my appointment time.', date: '2023-12-20', isApproved: true, isFeatured: false },
  { id: '7', customer: 'Sonia Verma', email: 'sonia@email.com', service: 'Gel Manicure', stylist: 'Sneha Reddy', rating: 3, comment: 'The manicure was okay but chipped after 3 days. Expected better quality for the price.', date: '2024-02-01', isApproved: false, isFeatured: false },
  { id: '8', customer: 'Meera Joshi', email: 'meera@email.com', service: 'Keratin Treatment', stylist: 'Priya Patel', rating: 5, comment: 'Amazing results! My hair has never been this smooth. The aftercare instructions were very helpful.', date: '2023-11-15', isApproved: true, isFeatured: true },
]

export default function AdminReviewsPage() {
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending' | 'featured'>('all')
  const [search, setSearch] = useState('')

  const filteredReviews = reviews.filter(r => {
    const matchesSearch = r.customer.toLowerCase().includes(search.toLowerCase()) ||
                         r.service.toLowerCase().includes(search.toLowerCase()) ||
                         r.stylist.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' ||
                         (filter === 'approved' && r.isApproved) ||
                         (filter === 'pending' && !r.isApproved) ||
                         (filter === 'featured' && r.isFeatured)
    return matchesSearch && matchesFilter
  })

  const handleApprove = (id: string) => {
    const review = reviews.find(r => r.id === id)
    if (review) review.isApproved = true
  }

  const handleReject = (id: string) => {
    const review = reviews.find(r => r.id === id)
    if (review) review.isApproved = false
  }

  const handleFeature = (id: string) => {
    const review = reviews.find(r => r.id === id)
    if (review) review.isFeatured = !review.isFeatured
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">
            Reviews <span className="text-primary">Management</span>
          </h1>
          <p className="text-muted-foreground mt-1">Manage and moderate customer reviews</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search reviews..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-glam-pink-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">🔍</span>
        </div>
        <Select value={filter} onValueChange={(v) => setFilter(v as 'all' | 'approved' | 'pending' | 'featured')}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="All Reviews" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reviews</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="featured">Featured</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {reviews.filter(r => {
          const matchesSearch = r.customer.toLowerCase().includes(search.toLowerCase()) ||
                               r.service.toLowerCase().includes(search.toLowerCase()) ||
                               r.stylist.toLowerCase().includes(search.toLowerCase())
          const matchesFilter = filter === 'all' ||
                               (filter === 'approved' && r.isApproved) ||
                               (filter === 'pending' && !r.isApproved) ||
                               (filter === 'featured' && r.isFeatured)
          return matchesSearch && matchesFilter
        }).map((review) => (
          <div key={review.id} className="card-elevated p-6">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">{review.customer.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{review.customer}</p>
                  <p className="text-sm text-muted-foreground">{review.email}</p>
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">{review.service}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{review.stylist}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{formatDate(review.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn('h-5 w-5', i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground')} />
                    ))}
                    <span className="text-sm font-medium ml-1">{review.rating}/5</span>
                  </div>
                </div>

                <p className="text-muted-foreground line-clamp-3">{review.comment}</p>

                <div className="flex items-center gap-4 pt-2 border-t flex-wrap">
                  <span className={cn('px-2 py-1 rounded-full text-xs font-medium',
                    review.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  )}>
                    {review.isApproved ? 'Approved' : 'Pending'}
                  </span>
                  {review.isFeatured && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-glam-gold-100 text-glam-gold-800">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {!review.isApproved && (
                  <Button variant="default" size="sm" onClick={() => handleApprove(review.id)}>
                    <Check className="mr-1 h-3 w-3" />
                    Approve
                  </Button>
                )}
                {review.isApproved && (
                  <Button variant="outline" size="sm" onClick={() => handleReject(review.id)}>
                    <X className="mr-1 h-3 w-3" />
                    Reject
                  </Button>
                )}
                <Button variant={review.isFeatured ? 'default' : 'outline'} size="sm" onClick={() => handleFeature(review.id)}>
                  <Star className="mr-1 h-3 w-3" />
                  {review.isFeatured ? 'Unfeature' : 'Feature'}
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" title="View details">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}