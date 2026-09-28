'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Search, Plus, Edit, Trash2, User, Mail, Phone, Calendar, Award, Star, Shield, Filter, ChevronDown, ChevronUp } from 'lucide-react'
import { cn, formatDate, formatCurrency, formatPhone, getSegmentColor } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const customerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  dateOfBirth: z.string().optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  segment: z.enum(['REGULAR', 'VIP', 'AT_RISK', 'INACTIVE', 'NEW']).default('NEW'),
  referralCode: z.string().optional(),
})

const customers = [
  { id: '1', name: 'Priya Sharma', email: 'priya@email.com', phone: '+91 98765 43210', dateOfBirth: '1995-03-15', gender: 'FEMALE', segment: 'VIP', referralCode: 'PRIYA2024', totalVisits: 24, totalSpent: 45600, lastVisit: '2024-12-10', createdAt: '2022-03-15' },
  { id: '2', name: 'Anjali Patel', email: 'anjali@email.com', phone: '+91 98765 43211', dateOfBirth: '1992-07-22', gender: 'FEMALE', segment: 'REGULAR', referralCode: 'ANJALI2023', totalVisits: 18, totalSpent: 32400, lastVisit: '2024-12-08', createdAt: '2023-01-20' },
  { id: '3', name: 'Riya Desai', email: 'riya@email.com', phone: '+91 98765 43212', dateOfBirth: '1998-11-05', gender: 'FEMALE', segment: 'REGULAR', referralCode: 'RIYA2023', totalVisits: 12, totalSpent: 18900, lastVisit: '2024-12-05', createdAt: '2023-06-10' },
  { id: '4', name: 'Neha Shah', email: 'neha@email.com', phone: '+91 98765 43213', dateOfBirth: '1990-04-18', gender: 'FEMALE', segment: 'VIP', referralCode: 'NEHA2022', totalVisits: 35, totalSpent: 89200, lastVisit: '2024-12-01', createdAt: '2021-11-05' },
  { id: '5', name: 'Kavya Reddy', email: 'kavya@email.com', phone: '+91 98765 43214', dateOfBirth: '1996-09-30', gender: 'FEMALE', segment: 'REGULAR', referralCode: 'KAVYA2023', totalVisits: 8, totalSpent: 15600, lastVisit: '2024-11-28', createdAt: '2023-08-15' },
  { id: '6', name: 'Meera Joshi', email: 'meera@email.com', phone: '+91 98765 43215', dateOfBirth: '1993-01-25', gender: 'FEMALE', segment: 'AT_RISK', referralCode: 'MEERA2022', totalVisits: 5, totalSpent: 7800, lastVisit: '2024-09-15', createdAt: '2023-03-20' },
  { id: '7', name: 'Divya Kapoor', email: 'divya@email.com', phone: '+91 98765 43216', dateOfBirth: '1997-12-12', gender: 'FEMALE', segment: 'NEW', referralCode: 'DIVYA2024', totalVisits: 2, totalSpent: 3200, lastVisit: '2024-11-20', createdAt: '2024-10-01' },
  { id: '8', name: 'Sonia Verma', email: 'sonia@email.com', phone: '+91 98765 43217', dateOfBirth: '1994-06-08', gender: 'FEMALE', segment: 'INACTIVE', referralCode: 'SONIA2022', totalVisits: 3, totalSpent: 4100, lastVisit: '2024-06-10', createdAt: '2022-12-10' },
]

const segmentOptions = [
  { value: 'all', label: 'All Segments' },
  { value: 'REGULAR', label: 'Regular' },
  { value: 'VIP', label: 'VIP' },
  { value: 'AT_RISK', label: 'At Risk' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'NEW', label: 'New' },
]

export default function AdminCustomersPage() {
  const [search, setSearch] = useState('')
  const [segmentFilter, setSegmentFilter] = useState('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<typeof customers[0] | null>(null)

  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '', email: '', phone: '', dateOfBirth: '', gender: undefined, segment: 'NEW', referralCode: '',
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

  const onSubmit = (data: z.infer<typeof customerSchema>) => {
    if (editingCustomer) {
      const index = customers.findIndex(c => c.id === editingCustomer.id)
      if (index > -1) customers[index] = { ...customers[index], ...data }
    } else {
      customers.unshift({ 
        id: Date.now().toString(), 
        ...data, 
        dateOfBirth: data.dateOfBirth || '',
        gender: data.gender || '',
        referralCode: data.referralCode || '',
        totalVisits: 0, 
        totalSpent: 0, 
        lastVisit: new Date().toISOString().split('T')[0], 
        createdAt: new Date().toISOString().split('T')[0] 
      })
    }
    setIsDialogOpen(false)
    reset()
    setEditingCustomer(null)
  }

  const handleEdit = (customer: typeof customers[0]) => {
    setEditingCustomer(customer)
    reset({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      dateOfBirth: customer.dateOfBirth,
      gender: customer.gender as 'MALE' | 'FEMALE' | 'OTHER' | undefined,
      segment: customer.segment as 'REGULAR' | 'VIP' | 'AT_RISK' | 'INACTIVE' | 'NEW',
      referralCode: customer.referralCode,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this customer?')) {
      const index = customers.findIndex(c => c.id === id)
      if (index > -1) customers.splice(index, 1)
    }
  }

  const filteredCustomers = customers
    .filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
                           c.email.toLowerCase().includes(search.toLowerCase()) ||
                           c.phone.includes(search)
      const matchesSegment = segmentFilter === 'all' || c.segment === segmentFilter
      return matchesSearch && matchesSegment
    })

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">
            Customers <span className="text-primary">Management</span>
          </h1>
          <p className="text-muted-foreground mt-1">Manage customer profiles and segments</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingCustomer(null); reset(); setIsDialogOpen(true) }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingCustomer ? 'Edit Customer' : 'Add New Customer'}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl><Input placeholder="Full name" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl><Input type="email" placeholder="email@example.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl><Input type="tel" placeholder="+91 98765 43210" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={control} name="segment" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Segment</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select segment" /></SelectTrigger></FormControl>
                        <SelectContent>
                          {['REGULAR', 'VIP', 'AT_RISK', 'INACTIVE', 'NEW'].map((seg) => (
                            <SelectItem key={seg} value={seg}>{seg}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={control} name="dateOfBirth" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={control} name="gender" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl>
                        <SelectContent>
                          {['MALE', 'FEMALE', 'OTHER'].map((g) => (<SelectItem key={g} value={g}>{g}</SelectItem>))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={control} name="referralCode" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referral Code (Optional)</FormLabel>
                    <FormControl><Input placeholder="Auto-generated if empty" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <DialogFooter>
                  <Button type="submit">{editingCustomer ? 'Update' : 'Create'} Customer</Button>
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
            <Input placeholder="Search name, email, phone..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
          <Select value={segmentFilter} onValueChange={setSegmentFilter}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="All Segments" /></SelectTrigger>
            <SelectContent>
              {segmentOptions.map((opt) => (<SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {['Customer', 'Contact', 'Segment', 'Visits', 'Total Spent', 'Last Visit', 'Joined', 'Actions'].map((col) => (
                  <TableHead key={col}>{col}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.filter(c => (segmentFilter === 'all' || c.segment === segmentFilter) &&
                (c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search))
              ).map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-bold text-primary">{customer.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">{customer.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{formatPhone(customer.phone)}</TableCell>
                  <TableCell><span className={cn('px-2 py-1 rounded-full text-xs font-medium', getSegmentColor(customer.segment))}>{customer.segment}</span></TableCell>
                  <TableCell>{customer.totalVisits}</TableCell>
                  <TableCell className="font-medium text-primary">{formatCurrency(customer.totalSpent)}</TableCell>
                  <TableCell>{formatDate(customer.lastVisit)}</TableCell>
                  <TableCell>{formatDate(customer.createdAt)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditingCustomer(customer); setIsDialogOpen(true); }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600" onClick={() => handleDelete(customer.id)}>
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