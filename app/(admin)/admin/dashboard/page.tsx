'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Users, CreditCard, Star, ArrowRight, TrendingUp, ShoppingBag, Sparkles, Users as UsersIcon, DollarSign, Clock, CheckCircle, UserPlus, Scissors, Tag } from 'lucide-react'
import Link from 'next/link'
import { cn, formatCurrency, formatDate, formatTime } from '@/lib/utils'

const stats = [
  { label: 'Today\'s Appointments', value: '12', change: '+2', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100' },
  { label: 'Total Customers', value: '2,458', change: '+12%', icon: UsersIcon, color: 'text-green-600', bg: 'bg-green-100' },
  { label: 'Monthly Revenue', value: '₹4,85,000', change: '+8%', icon: DollarSign, color: 'text-primary', bg: 'bg-glam-pink-100' },
  { label: 'Avg. Rating', value: '4.8', change: '+0.1', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100' },
]

const upcomingAppointments = [
  { id: '1', customer: 'Priya Sharma', service: 'Gold Facial', stylist: 'Dr. Meera Desai', date: '2024-12-15', time: '10:00', status: 'CONFIRMED', amount: 2500 },
  { id: '2', customer: 'Anjali Patel', service: 'HD Makeup', stylist: 'Anjali Sharma', date: '2024-12-15', time: '11:30', status: 'CONFIRMED', amount: 3500 },
  { id: '3', customer: 'Riya Desai', service: 'Keratin Treatment', stylist: 'Priya Patel', date: '2024-12-15', time: '14:00', status: 'IN_PROGRESS', amount: 4500 },
  { id: '4', customer: 'Neha Shah', service: 'Bridal Makeup', stylist: 'Anjali Sharma', date: '2024-12-15', time: '16:00', status: 'SCHEDULED', amount: 15000 },
  { id: '5', customer: 'Kavya Reddy', service: 'Swedish Massage', stylist: 'Kavya Nair', date: '2024-12-15', time: '10:30', status: 'COMPLETED', amount: 2000 },
]

const topServices = [
  { name: 'Gold Facial', bookings: 45, revenue: 112500 },
  { name: 'Haircut & Styling', bookings: 38, revenue: 22800 },
  { name: 'HD Makeup', bookings: 32, revenue: 112000 },
  { name: 'Keratin Treatment', bookings: 28, revenue: 126000 },
  { name: 'Swedish Massage', bookings: 25, revenue: 50000 },
]

const recentCustomers = [
  { id: '1', name: 'Meera Joshi', email: 'meera@email.com', phone: '+91 98765 43211', visits: 12, spent: 15600, lastVisit: '2024-12-10', tier: 'Gold' },
  { id: '2', name: 'Divya Kapoor', email: 'divya@email.com', phone: '+91 98765 43212', visits: 8, spent: 8900, lastVisit: '2024-12-08', tier: 'Silver' },
  { id: '3', name: 'Sonia Verma', email: 'sonia@email.com', phone: '+91 98765 43213', visits: 3, spent: 4200, lastVisit: '2024-12-05', tier: 'Bronze' },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">
            Admin <span className="text-primary">Dashboard</span>
          </h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening at The Glam Factory.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/appointments">View All Appointments <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild>
            <Link href="/admin/appointments/new">New Appointment <Sparkles className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <div className={cn('h-12 w-12 rounded-xl flex items-center justify-center', stat.bg)}>
                <stat.icon className={cn('h-6 w-6', stat.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</span>
                <span className="text-xs font-medium text-green-600">{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Today's Appointments
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/appointments">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((apt) => (
                <div key={apt.id} className={cn('flex items-center justify-between p-4 rounded-lg border', apt.status === 'IN_PROGRESS' && 'border-primary bg-primary/5')}>
                  <div className="flex items-center gap-4">
                    <div className={cn('h-10 w-10 rounded-full flex items-center justify-center', apt.status === 'IN_PROGRESS' && 'bg-primary/10 text-primary', apt.status === 'COMPLETED' && 'bg-green-100 text-green-600', apt.status === 'SCHEDULED' && 'bg-blue-100 text-blue-600')}>
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{apt.customer}</p>
                      <p className="text-sm text-muted-foreground">{apt.service} with {apt.stylist}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">{formatTime(apt.time)}</span>
                    <span className={cn('px-2 py-1 rounded-full text-xs font-medium',
                      apt.status === 'CONFIRMED' && 'bg-blue-100 text-blue-800',
                      apt.status === 'IN_PROGRESS' && 'bg-primary text-primary-foreground',
                      apt.status === 'SCHEDULED' && 'bg-yellow-100 text-yellow-800',
                      apt.status === 'COMPLETED' && 'bg-green-100 text-green-800'
                    )}>
                      {apt.status}
                    </span>
                    <span className="font-medium text-primary">{formatCurrency(apt.amount)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Top Services This Month
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/services">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topServices.map((service, index) => (
                <div key={service.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={cn('h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm', index < 3 ? 'bg-glam-gold-500 text-white' : 'bg-glam-pink-100 text-primary')}>
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-foreground">{service.name}</p>
                      <p className="text-xs text-muted-foreground">{service.bookings} bookings</p>
                    </div>
                  </div>
                  <span className="font-medium text-primary">{formatCurrency(service.revenue)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Customers
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/customers">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCustomers.map((customer) => (
                <div key={customer.id} className="flex items-center justify-between p-3 rounded-lg bg-glam-pink-50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">{customer.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{customer.name}</p>
                      <p className="text-xs text-muted-foreground">{customer.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{customer.visits} visits</p>
                    <p className="text-xs text-muted-foreground">{formatCurrency(customer.spent)} spent</p>
                    <span className={cn('inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium',
                      customer.tier === 'Gold' && 'bg-glam-gold-100 text-glam-gold-800',
                      customer.tier === 'Silver' && 'bg-gray-100 text-gray-800',
                      'bg-primary/10 text-primary'
                    )}>
                      {customer.tier}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2" asChild>
              <Link href="/admin/appointments/new">
                <Calendar className="h-6 w-6" />
                New Appointment
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2" asChild>
              <Link href="/admin/customers/new">
                <UserPlus className="h-6 w-6" />
                Add Customer
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2" asChild>
              <Link href="/admin/services/new">
                <Scissors className="h-6 w-6" />
                Add Service
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2" asChild>
              <Link href="/admin/offers/new">
                <Tag className="h-6 w-6" />
                Create Offer
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">This Week</span>
                <span className="font-medium">₹1,25,000</span>
              </div>
              <div className="h-2 bg-glam-pink-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '65%' }} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">This Month</span>
                <span className="font-medium">₹4,85,000</span>
              </div>
              <div className="h-2 bg-glam-pink-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '78%' }} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">This Year</span>
                <span className="font-medium">₹52,30,000</span>
              </div>
              <div className="h-2 bg-glam-pink-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '92%' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}