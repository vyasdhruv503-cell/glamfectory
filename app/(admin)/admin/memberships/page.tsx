'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Search, Plus, Edit, Trash2, Crown, DollarSign, Calendar, Gift, Percent, Star, ArrowRight } from 'lucide-react'
import { cn, formatDate, formatCurrency } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const membershipSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
  duration: z.number().min(30, 'Duration must be at least 30 days'),
  discountPercent: z.number().min(0).max(100).default(0),
  freeServices: z.number().min(0).default(0),
  benefits: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
})

const memberships = [
  { id: '1', name: 'Silver', description: 'Perfect for regular visits', price: 5000, duration: 365, discountPercent: 10, freeServices: 2, benefits: ['10% discount on all services', '2 free haircuts per year', 'Priority booking (24hr advance)', 'Birthday special gift worth ₹500', 'Free consultation anytime', 'Earn double loyalty points'], isActive: true },
  { id: '2', name: 'Gold', description: 'Best value for beauty enthusiasts', price: 12000, duration: 365, discountPercent: 20, freeServices: 4, benefits: ['20% discount on all services', '4 free services per year (any)', 'Priority booking + home service*', 'Birthday makeover worth ₹3,000', 'Free monthly consultation', 'Complimentary drink on visit', 'Earn triple loyalty points', 'Exclusive event invitations'], isActive: true },
  { id: '3', name: 'Platinum', description: 'Ultimate luxury experience', price: 25000, duration: 365, discountPercent: 30, freeServices: 8, benefits: ['30% discount on all services', '8 free services per year (any)', 'VIP priority + home service*', 'Annual makeover worth ₹8,000', 'Free monthly premium facial', 'Exclusive event invitations', 'Dedicated stylist assignment', 'Earn 4x loyalty points', 'Free parking validation', 'Guest passes (2 per quarter)'], isActive: true },
]

const customerMemberships = [
  { id: '1', customer: 'Priya Sharma', email: 'priya@email.com', plan: 'Gold', startDate: '2024-03-15', endDate: '2025-03-15', status: 'ACTIVE', autoRenew: true },
  { id: '2', customer: 'Anjali Patel', email: 'anjali@email.com', plan: 'Silver', startDate: '2024-01-20', endDate: '2025-01-20', status: 'ACTIVE', autoRenew: true },
  { id: '3', customer: 'Riya Desai', email: 'riya@email.com', plan: 'Silver', startDate: '2024-06-10', endDate: '2025-06-10', status: 'ACTIVE', autoRenew: false },
  { id: '4', customer: 'Neha Shah', email: 'neha@email.com', plan: 'Platinum', startDate: '2023-11-05', endDate: '2024-11-05', status: 'EXPIRED', autoRenew: false },
  { id: '5', customer: 'Kavya Reddy', email: 'kavya@email.com', plan: 'Gold', startDate: '2023-08-15', endDate: '2024-08-15', status: 'EXPIRED', autoRenew: false },
  { id: '6', customer: 'Meera Joshi', email: 'meera@email.com', plan: 'Silver', startDate: '2023-03-20', endDate: '2024-03-20', status: 'CANCELLED', autoRenew: false },
]

export default function AdminMembershipsPage() {
  const [tab, setTab] = useState<'plans' | 'subscriptions'>('plans')
  const [search, setSearch] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<typeof memberships[0] | null>(null)

  const form = useForm<z.infer<typeof membershipSchema>>({
    resolver: zodResolver(membershipSchema),
    defaultValues: {
      name: '', description: '', price: 0, duration: 365, discountPercent: 0, freeServices: 0, benefits: [], isActive: true,
    },
  })

const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    watch,
    setValue,
  } = form

const benefitsInput = watch('benefits') || []

  const onSubmit = (data: z.infer<typeof membershipSchema>) => {
    if (editingPlan) {
      const index = memberships.findIndex(p => p.id === editingPlan.id)
      if (index > -1) memberships[index] = { ...memberships[index], ...data }
    } else {
      memberships.unshift({ id: Date.now().toString(), ...data, description: data.description || '', benefits: data.benefits || [] })
    }
    setIsDialogOpen(false)
    reset()
    setEditingPlan(null)
  }

  const handleEdit = (plan: typeof memberships[0]) => {
    setEditingPlan(plan)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this membership plan?')) {
      const index = memberships.findIndex(p => p.id === id)
      if (index > -1) memberships.splice(index, 1)
    }
  }

  const toggleBenefit = (benefit: string) => {
    const current = watch('benefits') || []
    const newBenefits = current.includes(benefit) ? current.filter(b => b !== benefit) : [...current, benefit]
    setValue('benefits', newBenefits)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">
            Memberships <span className="text-primary">Management</span>
          </h1>
          <p className="text-muted-foreground mt-1">Manage membership plans and customer subscriptions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setTab('plans')}>Plans</Button>
          <Button variant="outline" onClick={() => setTab('subscriptions')}>Subscriptions</Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingPlan(null); reset(); setIsDialogOpen(true) }}>
                <Plus className="mr-2 h-4 w-4" />
                New Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingPlan ? 'Edit Membership Plan' : 'Create New Plan'}</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plan Name</FormLabel>
                      <FormControl><Input placeholder="e.g., Silver, Gold, Platinum" value={field.value as string} onChange={field.onChange} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={control} name="description" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl><Input placeholder="Short description" value={field.value as string} onChange={field.onChange} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={control} name="price" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (₹)</FormLabel>
                        <FormControl><Input type="number" min="0" step="1" value={field.value as string} onChange={field.onChange} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={control} name="duration" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration (days)</FormLabel>
                        <FormControl><Input type="number" min="30" step="1" value={field.value as string} onChange={field.onChange} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={control} name="discountPercent" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount %</FormLabel>
                        <FormControl><Input type="number" min="0" max="100" step="1" value={field.value as string} onChange={field.onChange} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={control} name="freeServices" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Free Services/Year</FormLabel>
                        <FormControl><Input type="number" min="0" step="1" value={field.value as string} onChange={field.onChange} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={control} name="benefits" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Benefits</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-2">
                          {['10% discount on all services', '20% discount on all services', '30% discount on all services', '2 free services/year', '4 free services/year', '8 free services/year', 'Priority booking', 'Home service', 'Birthday gift', 'Free consultation', 'Double loyalty points', 'Triple loyalty points', '4x loyalty points', 'Exclusive events', 'Dedicated stylist', 'Free parking', 'Guest passes'].map((benefit) => (
                            <label key={benefit} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border cursor-pointer hover:bg-glam-pink-50">
                              <input type="checkbox" checked={Array.isArray(field.value) && field.value.includes(benefit)} onChange={(e) => {
                                const current = watch('benefits') || []
                                const newBenefits = e.target.checked ? [...current, benefit] : current.filter(b => b !== benefit)
                                setValue('benefits', newBenefits)
                              }} className="h-4 w-4 rounded border-glam-pink-300 text-primary focus:ring-primary" />
                              <span className="text-sm">{benefit}</span>
                            </label>
                          ))}
                        </div>
                      </FormControl>
                    </FormItem>
                  )} />
                  <FormField control={control} name="isActive" render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <input type="checkbox" checked={field.value as boolean} onChange={field.onChange} className="h-4 w-4 rounded border-glam-pink-300 text-primary focus:ring-primary" />
                      </FormControl>
                      <FormLabel>Active</FormLabel>
                    </FormItem>
                  )} />
                  <DialogFooter>
                    <Button type="submit">{editingPlan ? 'Update' : 'Create'} Plan</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex gap-2 border-b border-glam-pink-200 pb-4 mb-4">
        <Button variant={tab === 'plans' ? 'default' : 'outline'} onClick={() => setTab('plans')}>
          <Crown className="mr-2 h-4 w-4" />
          Plans
        </Button>
        <Button variant={tab === 'subscriptions' ? 'default' : 'outline'} onClick={() => setTab('subscriptions')}>
          <ArrowRight className="mr-2 h-4 w-4" />
          Subscriptions
        </Button>
      </div>

      {tab === 'plans' && (
        <div className="card-elevated p-4">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search plans..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {memberships.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map((plan) => (
              <div key={plan.id} className={cn('card-elevated p-6 relative', plan.isActive ? '' : 'opacity-60')}>
                {plan.name === 'Gold' && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-white text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="flex items-start gap-4 mb-4">
                  <div className={cn('h-16 w-16 rounded-2xl flex items-center justify-center', plan.name === 'Gold' && 'bg-glam-gold-500', plan.name === 'Silver' && 'bg-gray-300', plan.name === 'Platinum' && 'bg-purple-600')}>
                    <span className="font-heading font-bold text-2xl text-white">{plan.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-xl">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                </div>
                <div className="mb-4 p-4 rounded-xl bg-glam-pink-50">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="font-heading font-bold text-2xl text-primary">{formatCurrency(plan.price)}</span>
                    <span className="text-muted-foreground">/ {plan.duration} days</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1"><Percent className="h-4 w-4 text-primary" /> {plan.discountPercent}% off</span>
                    <span className="flex items-center gap-1"><Gift className="h-4 w-4 text-glam-gold-600" /> {plan.freeServices} free services</span>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  {plan.benefits.slice(0, 3).map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2 text-sm">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                  {plan.benefits.length > 3 && <p className="text-xs text-muted-foreground">+{plan.benefits.length - 3} more benefits</p>}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(plan)} className="flex-1">Edit</Button>
                  <Button variant={plan.isActive ? 'destructive' : 'default'} size="sm" onClick={() => handleDelete(plan.id)} className="flex-1">
                    {plan.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'subscriptions' && (
        <div className="card-elevated p-4">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {['Customer', 'Plan', 'Start Date', 'End Date', 'Status', 'Auto-Renew', 'Actions'].map((col) => (
                    <TableHead key={col}>{col}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerMemberships.filter(c => c.customer.toLowerCase().includes(search.toLowerCase()) || c.plan.toLowerCase().includes(search.toLowerCase())).map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{sub.customer}</p>
                        <p className="text-xs text-muted-foreground">{sub.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={cn('px-2 py-1 rounded-full text-xs font-medium', sub.plan === 'Gold' && 'bg-glam-gold-500/10 text-glam-gold-800', sub.plan === 'Silver' && 'bg-gray-100 text-gray-800', sub.plan === 'Platinum' && 'bg-purple-100 text-purple-800')}>
                        {sub.plan}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(sub.startDate)}</TableCell>
                    <TableCell>{formatDate(sub.endDate)}</TableCell>
                    <TableCell><span className={cn('px-2 py-1 rounded-full text-xs font-medium', sub.status === 'ACTIVE' && 'bg-green-100 text-green-800', sub.status === 'EXPIRED' && 'bg-gray-100 text-gray-800', sub.status === 'CANCELLED' && 'bg-red-100 text-red-800')}>{sub.status}</span></TableCell>
                    <TableCell>{sub.autoRenew ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => alert('View details')}>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  )
}