'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Search, Plus, Edit, Trash2, Tag, Calendar, Percent, Gift, Clock, Copy } from 'lucide-react'
import { cn, formatDate, formatCurrency } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const offerSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().optional(),
  discountType: z.enum(['PERCENTAGE', 'FIXED_AMOUNT', 'FREE_SERVICE', 'BUY_ONE_GET_ONE']),
  discountValue: z.number().min(0),
  code: z.string().optional(),
  minAmount: z.number().min(0).default(0),
  maxDiscount: z.number().optional(),
  validFrom: z.string(),
  validTill: z.string(),
  isActive: z.boolean().default(true),
})

const offers = [
  { id: '1', title: 'New Client Special', description: 'Flat 20% off on your first visit', discountType: 'PERCENTAGE', discountValue: 20, code: 'WELCOME20', minAmount: 1000, validFrom: '2024-01-01', validTill: '2024-12-31', isActive: true },
  { id: '2', title: 'Bridal Early Bird', description: 'Free pre-bridal package worth ₹5000', discountType: 'FREE_SERVICE', discountValue: 5000, code: 'BRIDE2024', minAmount: 10000, validFrom: '2024-01-01', validTill: '2024-12-31', isActive: true },
  { id: '3', title: 'Weekday Glow', description: '30% off skin treatments Mon-Wed', discountType: 'PERCENTAGE', discountValue: 30, code: 'WEEKDAY30', minAmount: 1500, validFrom: '2024-01-01', validTill: '2024-12-31', isActive: true },
  { id: '4', title: 'Keratin + Haircut Combo', description: 'Free haircut with keratin treatment', discountType: 'FREE_SERVICE', discountValue: 800, code: 'KERATIN800', minAmount: 4500, validFrom: '2024-06-01', validTill: '2024-12-31', isActive: true },
  { id: '5', title: 'Group Booking Discount', description: '15% off for 3+ people', discountType: 'PERCENTAGE', discountValue: 15, code: 'GROUP15', minAmount: 3000, validFrom: '2024-01-01', validTill: '2024-12-31', isActive: true },
  { id: '6', title: 'Birthday Special', description: 'Free gift service worth ₹1000', discountType: 'FIXED_AMOUNT', discountValue: 1000, code: 'BDAY2024', minAmount: 2000, validFrom: '2024-01-01', validTill: '2024-12-31', isActive: true },
]

const discountTypes = [
  { value: 'PERCENTAGE', label: 'Percentage Off' },
  { value: 'FIXED_AMOUNT', label: 'Fixed Amount Off' },
  { value: 'FREE_SERVICE', label: 'Free Service' },
  { value: 'BUY_ONE_GET_ONE', label: 'Buy One Get One' },
]

export default function AdminOffersPage() {
  const [search, setSearch] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingOffer, setEditingOffer] = useState<typeof offers[0] | null>(null)

  const form = useForm<z.infer<typeof offerSchema>>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      title: '', description: '', discountType: 'PERCENTAGE', discountValue: 0, code: '', minAmount: 0, maxDiscount: undefined, validFrom: new Date().toISOString().split('T')[0], validTill: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0], isActive: true,
    },
  })

const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setValue,
    watch,
  } = form

  const onSubmit = (data: z.infer<typeof offerSchema>) => {
    if (editingOffer) {
      const index = offers.findIndex(o => o.id === editingOffer.id)
      if (index > -1) offers[index] = { ...offers[index], ...data }
    } else {
      offers.unshift({ id: Date.now().toString(), ...data, description: data.description || '', code: data.code || '' })
    }
    setIsDialogOpen(false)
    reset()
    setEditingOffer(null)
  }

  const handleEdit = (offer: typeof offers[0]) => {
    setEditingOffer(offer)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this offer?')) {
      const index = offers.findIndex(o => o.id === id)
      if (index > -1) offers.splice(index, 1)
    }
  }

  const getDiscountLabel = (offer: typeof offers[0]) => {
    switch (offer.discountType) {
      case 'PERCENTAGE': return `${offer.discountValue}% OFF`
      case 'FIXED_AMOUNT': return `${formatCurrency(offer.discountValue)} OFF`
      case 'FREE_SERVICE': return 'FREE Service'
      case 'BUY_ONE_GET_ONE': return 'Buy 1 Get 1'
      default: return 'Special Offer'
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">
            Offers <span className="text-primary">Management</span>
          </h1>
          <p className="text-muted-foreground mt-1">Create and manage promotional offers</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingOffer(null); reset(); setIsDialogOpen(true) }}>
              <Plus className="mr-2 h-4 w-4" />
              Create Offer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingOffer ? 'Edit Offer' : 'Create New Offer'}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={control} name="title" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Offer Title</FormLabel>
                    <FormControl><Input placeholder="e.g., New Client Special" value={field.value as string} onChange={field.onChange} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <textarea {...field} value={field.value as string} onChange={field.onChange} className="min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={control} name="discountType" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value as string}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
                        <SelectContent>
                          {discountTypes.map((dt) => (<SelectItem key={dt.value} value={dt.value}>{dt.label}</SelectItem>))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={control} name="discountValue" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Value</FormLabel>
                      <FormControl><Input type="number" min="0" step={0.01} value={field.value as string} onChange={field.onChange} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={control} name="code" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Promo Code (Optional)</FormLabel>
                    <FormControl><Input placeholder="e.g., WELCOME20" value={field.value as string} onChange={field.onChange} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={control} name="minAmount" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min. Amount (₹)</FormLabel>
                      <FormControl><Input type="number" min="0" step="1" value={field.value as string} onChange={field.onChange} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={control} name="maxDiscount" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Discount (₹)</FormLabel>
                      <FormControl><Input type="number" min="0" step="1" value={field.value as string} onChange={field.onChange} placeholder="Optional" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={control} name="validFrom" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valid From</FormLabel>
                      <FormControl><Input type="date" value={field.value as string} onChange={field.onChange} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={control} name="validTill" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valid Till</FormLabel>
                      <FormControl><Input type="date" value={field.value as string} onChange={field.onChange} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
<FormField control={control} name="isActive" render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <input type="checkbox" checked={field.value as boolean} onChange={field.onChange} className="h-4 w-4 rounded border-glam-pink-300 text-primary focus:ring-primary" />
                      </FormControl>
                      <FormLabel>Active</FormLabel>
                    </FormItem>
                  )} />
                <DialogFooter>
                  <Button type="submit">{editingOffer ? 'Update' : 'Create'} Offer</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="card-elevated p-4">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search offers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {['Offer', 'Discount', 'Code', 'Min. Amount', 'Validity', 'Status', 'Actions'].map((col) => (
                  <TableHead key={col}>{col}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {offers.filter(o => o.title.toLowerCase().includes(search.toLowerCase()) || o.code?.toLowerCase().includes(search.toLowerCase())).map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell>
                    <p className="font-medium">{offer.title}</p>
                    <p className="text-xs text-muted-foreground">{offer.description}</p>
                  </TableCell>
                  <TableCell><span className="font-medium text-primary">{getDiscountLabel(offer)}</span></TableCell>
                  <TableCell>{offer.code ? <code className="px-2 py-1 rounded bg-glam-pink-50 text-glam-pink-700 text-sm font-mono">{offer.code}</code> : <span className="text-muted-foreground">-</span>}</TableCell>
                  <TableCell>{offer.minAmount > 0 ? formatCurrency(offer.minAmount) : '-'}</TableCell>
                  <TableCell>
                    <p className="text-sm">{formatDate(offer.validFrom)} - {formatDate(offer.validTill)}</p>
                    <p className="text-xs text-muted-foreground">{(new Date(offer.validTill).getTime() - Date.now()) / (1000*60*60*24)} days left</p>
                  </TableCell>
                  <TableCell><span className={cn('px-2 py-1 rounded-full text-xs font-medium', offer.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800')}>{offer.isActive ? 'Active' : 'Inactive'}</span></TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditingOffer(offer); setIsDialogOpen(true); }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600" onClick={() => handleDelete(offer.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}