'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Calendar, Search, Plus, Edit, Trash2, Tag, Scissors, Sparkle, Crown, Gem, Flower2, Leaf, Droplet } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const serviceSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
  duration: z.number().min(5, 'Duration must be at least 5 minutes'),
  discountPrice: z.number().optional(),
  isActive: z.boolean().default(true),
})

const services = [
  { id: '1', name: 'Haircut & Styling', category: 'Hair', price: 800, discountPrice: 600, duration: 45, isActive: true },
  { id: '2', name: 'Hair Color', category: 'Hair', price: 2500, duration: 90, isActive: true },
  { id: '3', name: 'Gold Facial', category: 'Skin', price: 2500, duration: 60, isActive: true },
  { id: '4', name: 'HD Makeup', category: 'Makeup', price: 3500, duration: 90, isActive: true },
  { id: '5', name: 'Bridal Makeup Package', category: 'Bridal', price: 15000, duration: 180, isActive: true },
  { id: '6', name: 'Gel Manicure', category: 'Nails', price: 800, duration: 45, isActive: true },
  { id: '7', name: 'Full Body Wax', category: 'Waxing', price: 2500, duration: 90, isActive: true },
  { id: '8', name: 'Swedish Massage', category: 'Spa', price: 2000, duration: 60, isActive: true },
]

const categories = [
  { value: 'Hair', label: 'Hair', icon: Scissors },
  { value: 'Skin', label: 'Skin', icon: Sparkle },
  { value: 'Makeup', label: 'Makeup', icon: Gem },
  { value: 'Bridal', label: 'Bridal', icon: Crown },
  { value: 'Nails', label: 'Nails', icon: Flower2 },
  { value: 'Waxing', label: 'Waxing', icon: Leaf },
  { value: 'Spa', label: 'Spa', icon: Droplet },
]

export default function AdminServicesPage() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<typeof services[0] | null>(null)

  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
  })

const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setValue,
  } = form

  const onSubmit = (data: z.infer<typeof serviceSchema>) => {
    if (editingService) {
      const index = services.findIndex(s => s.id === editingService.id)
      if (index > -1) services[index] = { ...services[index], ...data }
    } else {
      services.unshift({ id: Date.now().toString(), ...data })
    }
    setIsDialogOpen(false)
    reset()
    setEditingService(null)
  }

  const handleEdit = (service: typeof services[0]) => {
    setEditingService(service)
    reset(service)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this service?')) {
      const index = services.findIndex(s => s.id === id)
      if (index > -1) services.splice(index, 1)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">
            Services <span className="text-primary">Management</span>
          </h1>
          <p className="text-muted-foreground mt-1">Manage all services and categories</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingService(null); reset(); setIsDialogOpen(true) }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Name</FormLabel>
                    <FormControl><Input placeholder="Service name" value={field.value as string} onChange={field.onChange} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={control} name="category" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value as string}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                  <FormField control={control} name="price" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (₹)</FormLabel>
                      <FormControl><Input type="number" min="0" step="1" value={field.value as string} onChange={field.onChange} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={control} name="duration" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (min)</FormLabel>
                      <FormControl><Input type="number" min="5" step="5" value={field.value as string} onChange={field.onChange} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={control} name="discountPrice" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Price (₹)</FormLabel>
                    <FormControl><Input type="number" min="0" step="1" value={field.value as string} onChange={field.onChange} placeholder="Optional" /></FormControl>
                    <FormMessage />
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
                  <Button type="submit">{editingService ? 'Update' : 'Create'} Service</Button>
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
            <Input placeholder="Search services..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="All Categories" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (<SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {['Service', 'Category', 'Price', 'Duration', 'Status', 'Actions'].map((col) => (
                  <TableHead key={col}>{col}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.filter(s => (categoryFilter === 'all' || s.category === categoryFilter) && s.name.toLowerCase().includes(search.toLowerCase())).map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Tag className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-xs text-muted-foreground">{service.category}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{service.category}</TableCell>
                  <TableCell className="font-medium text-primary">{formatCurrency(service.price)}{service.discountPrice && <span className="ml-2 text-sm text-muted-foreground line-through">{formatCurrency(service.price)}</span>}</TableCell>
                  <TableCell>{service.duration} min</TableCell>
                  <TableCell><span className={cn('px-2 py-1 rounded-full text-xs font-medium', service.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800')}>{service.isActive ? 'Active' : 'Inactive'}</span></TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(service)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600" onClick={() => handleDelete(service.id)}><Trash2 className="h-4 w-4" /></Button>
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