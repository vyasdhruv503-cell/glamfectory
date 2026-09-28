'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, Filter, DollarSign, CreditCard, Download, Calendar, Clock, AlertCircle, CheckCircle, XCircle, Eye } from 'lucide-react'
import { cn, formatDate, formatTime, formatCurrency, getPaymentStatusColor } from '@/lib/utils'

const payments = [
  { id: '1', customer: 'Priya Sharma', service: 'Gold Facial', amount: 2500, tax: 450, total: 2950, method: 'UPI', status: 'PAID', date: '2024-12-10', time: '14:30', transactionId: 'UPI123456789' },
  { id: '2', customer: 'Anjali Patel', service: 'HD Makeup', amount: 3500, tax: 630, total: 4130, method: 'CARD', status: 'PAID', date: '2024-12-10', time: '11:45', transactionId: 'CARD987654321' },
  { id: '3', customer: 'Riya Desai', service: 'Keratin Treatment', amount: 4500, tax: 810, total: 5310, method: 'CASH', status: 'PAID', date: '2024-12-09', time: '16:20', transactionId: 'CASH456789123' },
  { id: '4', customer: 'Neha Shah', service: 'Bridal Makeup', amount: 15000, tax: 2700, total: 17700, method: 'RAZORPAY', status: 'PARTIAL', date: '2024-12-08', time: '10:00', transactionId: 'RZP789123456' },
  { id: '5', customer: 'Kavya Reddy', service: 'Swedish Massage', amount: 2000, tax: 360, total: 2360, method: 'WALLET', status: 'PAID', date: '2024-12-07', time: '14:30', transactionId: 'WALLET321654987' },
  { id: '6', customer: 'Meera Joshi', service: 'HD Makeup', amount: 3500, tax: 630, total: 4130, method: 'CARD', status: 'REFUNDED', date: '2024-12-05', time: '11:15', transactionId: 'CARD111222333' },
  { id: '7', customer: 'Divya Kapoor', service: 'Swedish Massage', amount: 2000, tax: 360, total: 2360, method: 'UPI', status: 'PAID', date: '2024-12-04', time: '15:45', transactionId: 'UPI555666777' },
  { id: '8', customer: 'Sonia Verma', service: 'Gold Facial', amount: 2500, tax: 450, total: 2950, method: 'CASH', status: 'PAID', date: '2024-12-03', time: '12:00', transactionId: 'CASH999888777' },
  { id: '9', customer: 'Pooja Agarwal', service: 'Diamond Facial', amount: 3500, tax: 630, total: 4130, method: 'RAZORPAY', status: 'FAILED', date: '2024-12-01', time: '14:00', transactionId: 'RZP111222333' },
  { id: '10', customer: 'Aarti Mehta', service: 'HD Makeup', amount: 3500, tax: 630, total: 4130, method: 'UPI', status: 'PAID', date: '2024-11-30', time: '16:30', transactionId: 'UPI888999000' },
]

const methodOptions = [
  { value: 'all', label: 'All Methods' },
  { value: 'CASH', label: 'Cash' },
  { value: 'CARD', label: 'Card' },
  { value: 'UPI', label: 'UPI' },
  { value: 'WALLET', label: 'Wallet' },
  { value: 'RAZORPAY', label: 'Razorpay' },
]

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'PAID', label: 'Paid' },
  { value: 'PARTIAL', label: 'Partial' },
  { value: 'REFUNDED', label: 'Refunded' },
  { value: 'FAILED', label: 'Failed' },
  { value: 'PENDING', label: 'Pending' },
]

export default function AdminPaymentsPage() {
  const [search, setSearch] = useState('')
  const [methodFilter, setMethodFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const filteredPayments = payments.filter(p => {
    const matchesSearch = p.customer.toLowerCase().includes(search.toLowerCase()) ||
                         p.service.toLowerCase().includes(search.toLowerCase()) ||
                         p.transactionId.toLowerCase().includes(search.toLowerCase())
    const matchesMethod = methodFilter === 'all' || p.method === methodFilter
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter
    const matchesDateFrom = !dateFrom || p.date >= dateFrom
    const matchesDateTo = !dateTo || p.date <= dateTo
    return matchesSearch && matchesMethod && matchesStatus && matchesDateFrom && matchesDateTo
  })

  const totalRevenue = filteredPayments.reduce((sum, p) => sum + p.total, 0)
  const totalRefunds = filteredPayments.filter(p => p.status === 'REFUNDED').reduce((sum, p) => sum + p.total, 0)

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">
            Payments <span className="text-primary">Management</span>
          </h1>
          <p className="text-muted-foreground mt-1">Track all payments and transactions</p>
        </div>
        <Button variant="outline" asChild>
          <a href="/admin/payments/export">Export Report</a>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="font-heading font-bold text-2xl text-primary">{formatCurrency(totalRevenue)}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Refunds</p>
              <p className="font-heading font-bold text-2xl text-red-600">{formatCurrency(totalRefunds)}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-red-100 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Transactions</p>
              <p className="font-heading font-bold text-2xl text-foreground">{payments.length}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-glam-pink-100 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Net Revenue</p>
              <p className="font-heading font-bold text-2xl text-green-600">{formatCurrency(totalRevenue - totalRefunds)}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="card-elevated p-4">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search customer, service, transaction..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-[140px]"><SelectValue placeholder="All Methods" /></SelectTrigger>
              <SelectContent>{methodOptions.map((opt) => (<SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>))}</SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]"><SelectValue placeholder="All Status" /></SelectTrigger>
              <SelectContent>{statusOptions.map((opt) => (<SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>))}</SelectContent>
            </Select>
            <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} placeholder="From" className="w-[140px]" />
            <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} placeholder="To" className="w-[140px]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {['Transaction ID', 'Customer', 'Service', 'Amount', 'Tax', 'Total', 'Method', 'Status', 'Date & Time', 'Actions'].map((col) => (
                  <TableHead key={col}>{col}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.filter(p => (methodFilter === 'all' || p.method === methodFilter) &&
                (statusFilter === 'all' || p.status === statusFilter) &&
                (!dateFrom || p.date >= dateFrom) &&
                (!dateTo || p.date <= dateTo) &&
                (p.customer.toLowerCase().includes(search.toLowerCase()) ||
                 p.service.toLowerCase().includes(search.toLowerCase()) ||
                 p.transactionId.toLowerCase().includes(search.toLowerCase()))
              ).map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell><code className="text-sm">{payment.transactionId}</code></TableCell>
                  <TableCell>
                    <p className="font-medium">{payment.customer}</p>
                    <p className="text-xs text-muted-foreground">{payment.service}</p>
                  </TableCell>
                  <TableCell className="font-medium text-primary">{formatCurrency(payment.amount)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{formatCurrency(payment.tax)}</TableCell>
                  <TableCell className="font-medium text-foreground">{formatCurrency(payment.total)}</TableCell>
                  <TableCell>
                    <span className={cn('px-2 py-1 rounded-full text-xs font-medium',
                      payment.method === 'CASH' && 'bg-green-100 text-green-800',
                      payment.method === 'CARD' && 'bg-blue-100 text-blue-800',
                      payment.method === 'UPI' && 'bg-purple-100 text-purple-800',
                      payment.method === 'WALLET' && 'bg-glam-gold-100 text-glam-gold-800',
                      payment.method === 'RAZORPAY' && 'bg-pink-100 text-pink-800'
                    )}>
                      {payment.method}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={cn('px-2 py-1 rounded-full text-xs font-medium', getPaymentStatusColor(payment.status))}>
                      {payment.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm">
                    <p>{formatDate(payment.date)}</p>
                    <p className="text-muted-foreground">{formatTime(payment.time)}</p>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8" title="View details">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" title="Refund">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            Showing {payments.filter(p => (methodFilter === 'all' || p.method === methodFilter) &&
              (statusFilter === 'all' || p.status === statusFilter)).length} of {payments.length} transactions
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href="/admin/payments/export?format=csv">Export CSV <Download className="ml-2 h-4 w-4" /></a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="/admin/payments/export?format=pdf">Export PDF <Download className="ml-2 h-4 w-4" /></a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}