'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Search, Plus, Edit, Trash2, UserPlus, Calendar, Clock, Star, Shield, Briefcase, Sparkles } from 'lucide-react'
import { cn, formatDate, formatCurrency, getStatusColor } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const staffSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  role: z.enum(['STYLIST', 'MANAGER', 'RECEPTIONIST']),
  specialization: z.array(z.string()).optional(),
  experience: z.number().min(0),
  commissionRate: z.number().min(0).max(100).default(0),
  isActive: z.boolean().default(true),
})

const staff = [
  { id: '1', name: 'Priya Patel', email: 'priya.patel@glamfactory.in', phone: '+91 98765 43220', role: 'STYLIST', specialization: ['Haircut', 'Hair Color', 'Keratin', 'Bridal Hair'], experience: 12, commissionRate: 15, isActive: true, avgRating: 4.9, totalReviews: 234 },
  { id: '2', name: 'Anjali Sharma', email: 'anjali.sharma@glamfactory.in', phone: '+91 98765 43221', role: 'STYLIST', specialization: ['Bridal Makeup', 'Airbrush', 'HD Makeup', 'Party Makeup'], experience: 10, commissionRate: 20, isActive: true, avgRating: 4.9, totalReviews: 189 },
  { id: '3', name: 'Dr. Meera Desai', email: 'meera.desai@glamfactory.in', phone: '+91 98765 43222', role: 'STYLIST', specialization: ['Gold Facial', 'HydraFacial', 'Anti-Aging', 'Acne Treatment'], experience: 8, commissionRate: 18, isActive: true, avgRating: 4.8, totalReviews: 156 },
  { id: '4', name: 'Rohit Singh', email: 'rohit.singh@glamfactory.in', phone: '+91 98765 43223', role: 'STYLIST', specialization: ['Men\'s Haircut', 'Beard Trim', 'Hair Spa', 'Scalp Treatment'], experience: 7, commissionRate: 15, isActive: true, avgRating: 4.7, totalReviews: 123 },
  { id: '5', name: 'Sneha Reddy', email: 'sneha.reddy@glamfactory.in', phone: '+91 98765 43224', role: 'STYLIST', specialization: ['Nail Art', 'Gel Extensions', 'Acrylic Nails', 'Spa Manicure'], experience: 6, commissionRate: 15, isActive: true, avgRating: 4.9, totalReviews: 98 },
  { id: '6', name: 'Kavya Nair', email: 'kavya.nair@glamfactory.in', phone: '+91 98765 43225', role: 'STYLIST', specialization: ['Swedish Massage', 'Deep Tissue', 'Aromatherapy', 'Body Scrub'], experience: 9, commissionRate: 15, isActive: true, avgRating: 4.8, totalReviews: 167 },
  { id: '7', name: 'Rajesh Kumar', email: 'rajesh.kumar@glamfactory.in', phone: '+91 98765 43226', role: 'MANAGER', specialization: [], experience: 15, commissionRate: 0, isActive: true, avgRating: 0, totalReviews: 0 },
  { id: '8', name: 'Pooja Singh', email: 'pooja.singh@glamfactory.in', phone: '+91 98765 43227', role: 'RECEPTIONIST', specialization: [], experience: 5, commissionRate: 0, isActive: true, avgRating: 0, totalReviews: 0 },
]

const roles = [
  { value: 'STYLIST', label: 'Stylist', icon: Sparkles },
  { value: 'MANAGER', label: 'Manager', icon: Briefcase },
  { value: 'RECEPTIONIST', label: 'Receptionist', icon: UserPlus },
]

export default function AdminStaffPage() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingStaff, setEditingStaff] = useState<typeof staff[0] | null>(null)

  const form = useForm<z.infer<typeof staffSchema>>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      name: '', email: '', phone: '', role: 'STYLIST', specialization: [], experience: 0, commissionRate: 0, isActive: true,
    },
  })

const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
  } = form

  const specializationInput = watch('specialization') || []

  const onSubmit = (data: z.infer<typeof staffSchema>) => {
    if (editingStaff) {
      const index = staff.findIndex(s => s.id === editingStaff.id)
      if (index > -1) staff[index] = { ...staff[index], ...data }
    } else {
      staff.unshift({ id: Date.now().toString(), ...data, specialization: data.specialization || [], avgRating: 0, totalReviews: 0 })
    }
    setIsDialogOpen(false)
    reset()
    setEditingStaff(null)
  }

  const handleEdit = (member: typeof staff[0]) => {
    setEditingStaff(member)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this staff member?')) {
      const index = staff.findIndex(s => s.id === id)
      if (index > -1) staff.splice(index, 1)
    }
  }

  const toggleSpecialization = (spec: string) => {
    const current = watch('specialization') || []
    const newSpecs = current.includes(spec) ? current.filter(s => s !== spec) : [...current, spec]
    setValue('specialization', newSpecs)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">
            Staff <span className="text-primary">Management</span>
          </h1>
          <p className="text-muted-foreground mt-1">Manage stylists, managers, and receptionists</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingStaff(null); reset(); setIsDialogOpen(true) }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Staff Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl><Input placeholder="Full name" value={field.value as string} onChange={field.onChange} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl><Input type="email" placeholder="email@glamfactory.in" value={field.value as string} onChange={field.onChange} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl><Input type="tel" placeholder="+91 98765 43220" value={field.value as string} onChange={field.onChange} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={control} name="role" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value as string}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger></FormControl>
                        <SelectContent>
                          {roles.map((r) => (<SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={control} name="experience" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience (years)</FormLabel>
                      <FormControl><Input type="number" min="0" step="1" value={field.value as string} onChange={field.onChange} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={control} name="commissionRate" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Commission Rate (%)</FormLabel>
                      <FormControl><Input type="number" min="0" max="100" step="1" value={field.value as string} onChange={field.onChange} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={control} name="specialization" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specializations</FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-2">
                        {['Haircut', 'Hair Color', 'Keratin', 'Bridal Hair', 'Bridal Makeup', 'Airbrush', 'HD Makeup', 'Party Makeup', 'Gold Facial', 'HydraFacial', 'Anti-Aging', 'Acne Treatment', 'Men\'s Haircut', 'Beard Trim', 'Hair Spa', 'Scalp Treatment', 'Nail Art', 'Gel Extensions', 'Acrylic Nails', 'Spa Manicure', 'Swedish Massage', 'Deep Tissue', 'Aromatherapy', 'Body Scrub'].map((spec) => (
                          <label key={spec} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border cursor-pointer hover:bg-glam-pink-50">
                            <input type="checkbox" checked={Array.isArray(field.value) && field.value.includes(spec)} onChange={(e) => {
                              const current = watch('specialization') || []
                              const newSpecs = e.target.checked ? [...current, spec] : current.filter(s => s !== spec)
                              setValue('specialization', newSpecs)
                            }} className="h-4 w-4 rounded border-glam-pink-300 text-primary focus:ring-primary" />
                            <span className="text-sm">{spec}</span>
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
                  <Button type="submit">{editingStaff ? 'Update' : 'Create'} Staff Member</Button>
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
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="All Roles" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {roles.map((r) => (<SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="All Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="true">Active</SelectItem>
              <SelectItem value="false">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {['Staff', 'Role', 'Specializations', 'Experience', 'Commission', 'Rating', 'Status', 'Actions'].map((col) => (
                  <TableHead key={col}>{col}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {staff.filter(s => (roleFilter === 'all' || s.role === roleFilter) &&
                (statusFilter === 'all' || s.isActive.toString() === statusFilter) &&
                (s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()) || s.phone.includes(search))
              ).map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-bold text-primary">{member.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={cn('px-2 py-1 rounded-full text-xs font-medium',
                      member.role === 'STYLIST' && 'bg-primary/10 text-primary',
                      member.role === 'MANAGER' && 'bg-glam-gold-500/10 text-glam-gold-600',
                      member.role === 'RECEPTIONIST' && 'bg-blue-100 text-blue-800'
                    )}>
                      {member.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {member.specialization.slice(0, 3).map((spec) => (
                        <span key={spec} className="px-2 py-0.5 rounded-full bg-glam-pink-50 text-glam-pink-700 text-xs">{spec}</span>
                      ))}
                      {member.specialization.length > 3 && <span className="px-2 py-0.5 rounded-full bg-glam-pink-50 text-glam-pink-700 text-xs">+{member.specialization.length - 3} more</span>}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{member.experience} yrs</TableCell>
                  <TableCell className="text-center">{member.commissionRate}%</TableCell>
                  <TableCell className="text-center">
                    {member.avgRating > 0 ? (
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{member.avgRating}</span>
                        <span className="text-xs text-muted-foreground">({member.totalReviews})</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className={cn('px-2 py-1 rounded-full text-xs font-medium', member.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800')}>
                      {member.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(member)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600" onClick={() => handleDelete(member.id)}>
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