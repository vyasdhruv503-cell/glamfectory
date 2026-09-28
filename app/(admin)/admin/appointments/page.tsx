'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Calendar, Search, Filter, ChevronDown, ChevronUp, CheckCircle, XCircle, AlertCircle, Clock, Edit, Trash2, Eye } from 'lucide-react'
import { cn, formatDate, formatTime, formatCurrency, getStatusColor } from '@/lib/utils'

const appointments = [
  { id: '1', customer: 'Priya Sharma', phone: '+91 98765 43210', service: 'Gold Facial', stylist: 'Dr. Meera Desai', date: '2024-12-15', time: '10:00', duration: 60, status: 'CONFIRMED', amount: 2500, payment: 'PAID' },
  { id: '2', customer: 'Anjali Patel', phone: '+91 98765 43211', service: 'HD Makeup', stylist: 'Anjali Sharma', date: '2024-12-15', time: '11:30', duration: 90, status: 'CONFIRMED', amount: 3500, payment: 'PAID' },
  { id: '3', customer: 'Riya Desai', phone: '+91 98765 43212', service: 'Keratin Treatment', stylist: 'Priya Patel', date: '2024-12-15', time: '14:00', duration: 120, status: 'IN_PROGRESS', amount: 4500, payment: 'PAID' },
  { id: '4', customer: 'Neha Shah', phone: '+91 98765 43213', service: 'Bridal Makeup', stylist: 'Anjali Sharma', date: '2024-12-15', time: '16:00', duration: 180, status: 'SCHEDULED', amount: 15000, payment: 'PARTIAL' },
  { id: '4', customer: 'Kavya Reddy', phone: '+91 98765 43214', service: 'Swedish Massage', stylist: 'Kavya Nair', date: '2024-12-15', time: '10:30', duration: 60, status: 'COMPLETED', amount: 2000, payment: 'PAID' },
  { id: '5', customer: 'Meera Joshi', phone: '+91 98765 43215', service: 'HD Makeup', stylist: 'Anjali Sharma', date: '2024-12-14', time: '15:00', duration: 90, status: 'COMPLETED', amount: 3500, payment: 'PAID' },
  { id: '6', customer: 'Divya Kapoor', phone: '+91 98765 43216', service: 'Keratin Treatment', stylist: 'Priya Patel', date: '2024-12-13', time: '11:00', duration: 120, status: 'COMPLETED', amount: 4500, payment: 'PAID' },
  { id: '7', customer: 'Sonia Verma', phone: '+91 98765 43217', service: 'Gold Facial', stylist: 'Dr. Meera Desai', date: '2024-12-12', time: '10:00', duration: 60, status: 'COMPLETED', amount: 2500, payment: 'PAID' },
  { id: '8', customer: 'Pooja Agarwal', phone: '+91 98765 43218', service: 'Diamond Facial', stylist: 'Dr. Meera Desai', date: '2024-12-12', time: '12:00', duration: 75, status: 'CANCELLED', amount: 3500, payment: 'REFUNDED' },
  { id: '9', customer: 'Aarti Mehta', phone: '+91 98765 43219', service: 'HD Makeup', stylist: 'Anjali Sharma', date: '2024-12-11', time: '16:00', duration: 90, status: 'COMPLETED', amount: 3500, payment: 'PAID' },
]

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'SCHEDULED', label: 'Scheduled' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'NO_SHOW', label: 'No Show' },
]

export default function AdminAppointmentsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('')
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'date', direction: 'desc' })

  const filteredAppointments = appointments
    .filter(apt => {
      const matchesSearch = apt.customer.toLowerCase().includes(search.toLowerCase()) ||
                           apt.service.toLowerCase().includes(search.toLowerCase()) ||
                           apt.stylist.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'all' || apt.status === statusFilter
      const matchesDate = !dateFilter || apt.date === dateFilter
      return matchesSearch && matchesStatus && matchesDate
    })
    .sort((a, b) => {
      let aVal = a[sortConfig.key as keyof typeof a]
      let bVal = b[sortConfig.key as keyof typeof b]
      if (typeof aVal === 'string') aVal = aVal.toLowerCase()
      if (typeof bVal === 'string') bVal = bVal.toLowerCase()
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const handleStatusChange = (id: string, newStatus: string) => {
    const apt = appointments.find(a => a.id === id)
    if (apt) apt.status = newStatus as any
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this appointment?')) {
      const index = appointments.findIndex(a => a.id === id)
      if (index > -1) appointments.splice(index, 1)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">
            Appointments <span className="text-primary">Management</span>
          </h1>
          <p className="text-muted-foreground mt-1">Manage all appointments and bookings</p>
        </div>
        <Button asChild>
          <a href="/admin/appointments/new">New Appointment</a>
        </Button>
      </div>

      <div className="card-elevated p-4">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customer, service, stylist..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-[160px]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {[
                  { key: 'customer', label: 'Customer' },
                  { key: 'service', label: 'Service' },
                  { key: 'stylist', label: 'Stylist' },
                  { key: 'date', label: 'Date' },
                  { key: 'time', label: 'Time' },
                  { key: 'status', label: 'Status' },
                  { key: 'amount', label: 'Amount' },
                  { key: 'payment', label: 'Payment' },
                  { key: 'actions', label: 'Actions' },
                ].map((col) => (
                  <TableHead key={col.key} className="cursor-pointer" onClick={() => handleSort(col.key)}>
                    <div className="flex items-center gap-1">
                      {col.label}
                      {sortConfig.key === col.key && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((apt) => (
                <TableRow key={apt.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{apt.customer}</p>
                      <p className="text-sm text-muted-foreground">{apt.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>{apt.service}</TableCell>
                  <TableCell>{apt.stylist}</TableCell>
                  <TableCell>{formatDate(apt.date)}</TableCell>
                  <TableCell>{formatTime(apt.time)}</TableCell>
                  <TableCell>
                    <span className={cn('px-2 py-1 rounded-full text-xs font-medium', getStatusColor(apt.status))}>
                      {apt.status}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium text-primary">{formatCurrency(apt.amount)}</TableCell>
                  <TableCell>
                    <span className={cn('px-2 py-1 rounded-full text-xs font-medium',
                      apt.payment === 'PAID' && 'bg-green-100 text-green-800',
                      apt.payment === 'PARTIAL' && 'bg-yellow-100 text-yellow-800',
                      apt.payment === 'REFUNDED' && 'bg-red-100 text-red-800',
                      'bg-gray-100 text-gray-800'
                    )}>
                      {apt.payment}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleStatusChange(apt.id, 'COMPLETED')} title="Mark Complete">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleStatusChange(apt.id, 'CANCELLED')} title="Cancel">
                        <XCircle className="h-4 w-4 text-red-600" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(apt.id)} title="Delete">
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            Showing {filteredAppointments.length} of {appointments.length} appointments
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </div>
    </div>
  )
}