'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Bell, CheckCircle, X, Calendar, Clock, Mail, MessageSquare, Filter, ChevronDown, Sparkles } from 'lucide-react'
import { cn, formatDateTime } from '@/lib/utils'

const initialNotifications = [
  { id: '1', type: 'APPOINTMENT_CONFIRMED', title: 'Appointment Confirmed', message: 'Your Gold Facial with Dr. Meera Desai is confirmed for Dec 20, 2:00 PM', time: '2024-12-15T10:30:00', read: false, channel: 'IN_APP' },
  { id: '2', type: 'APPOINTMENT_REMINDER', title: 'Reminder: Appointment Tomorrow', message: 'Your Gel Manicure with Sneha Reddy is tomorrow at 11:00 AM', time: '2024-12-14T09:00:00', read: false, channel: 'WHATSAPP' },
  { id: '3', type: 'OFFER_AVAILABLE', title: 'New Offer Available', message: 'Weekday Glow: 30% off skin treatments Mon-Wed. Use code WEEKDAY30', time: '2024-12-10T12:00:00', read: true, channel: 'EMAIL' },
  { id: '4', type: 'LOYALTY_POINTS', title: 'Points Earned!', message: 'You earned 250 loyalty points from your Gold Facial appointment', time: '2024-12-10T14:30:00', read: true, channel: 'IN_APP' },
  { id: '5', type: 'PAYMENT_SUCCESS', title: 'Payment Successful', message: '₹800 paid for Gel Manicure via UPI. Wallet balance: ₹1,200', time: '2024-12-05T11:15:00', read: true, channel: 'IN_APP' },
  { id: '6', type: 'REFERRAL_REWARD', title: 'Referral Reward Earned!', message: 'Anjali S. completed their first visit. You earned ₹100!', time: '2024-12-01T16:00:00', read: true, channel: 'IN_APP' },
  { id: '7', type: 'BIRTHDAY_OFFER', title: 'Birthday Special!', message: 'Happy Birthday! Enjoy a free gift service worth ₹1,000 this month. Code: BDAY2024', time: '2024-11-28T08:00:00', read: true, channel: 'EMAIL' },
  { id: '8', type: 'APPOINTMENT_CANCELLED', title: 'Appointment Cancelled', message: 'Your Diamond Facial on Sep 30 has been cancelled. Full refund processed.', time: '2024-09-25T10:00:00', read: true, channel: 'WHATSAPP' },
  { id: '9', type: 'MEMBERSHIP_RENEWAL', title: 'Membership Renewal Due', message: 'Your Gold membership expires on Mar 15, 2025. Auto-renewal is enabled.', time: '2024-11-01T10:00:00', read: true, channel: 'EMAIL' },
  { id: '10', type: 'REVIEW_REQUEST', title: 'How was your visit?', message: 'Rate your Swedish Massage with Kavya Nair and earn 50 bonus points!', time: '2024-10-29T18:00:00', read: true, channel: 'WHATSAPP' },
]

const typeIcons: Record<string, any> = {
  APPOINTMENT_CONFIRMED: Calendar,
  APPOINTMENT_REMINDER: Clock,
  OFFER_AVAILABLE: Sparkles,
  LOYALTY_POINTS: Sparkles,
  PAYMENT_SUCCESS: CheckCircle,
  REFERRAL_REWARD: Sparkles,
  BIRTHDAY_OFFER: Sparkles,
  APPOINTMENT_CANCELLED: X,
  MEMBERSHIP_RENEWAL: Calendar,
  REVIEW_REQUEST: Sparkles,
}

const typeColors: Record<string, string> = {
  APPOINTMENT_CONFIRMED: 'bg-blue-100 text-blue-600',
  APPOINTMENT_REMINDER: 'bg-yellow-100 text-yellow-600',
  OFFER_AVAILABLE: 'bg-glam-pink-100 text-glam-pink-600',
  LOYALTY_POINTS: 'bg-glam-gold-100 text-glam-gold-600',
  PAYMENT_SUCCESS: 'bg-green-100 text-green-600',
  REFERRAL_REWARD: 'bg-purple-100 text-purple-600',
  BIRTHDAY_OFFER: 'bg-pink-100 text-pink-600',
  APPOINTMENT_CANCELLED: 'bg-red-100 text-red-600',
  MEMBERSHIP_RENEWAL: 'bg-indigo-100 text-indigo-600',
  REVIEW_REQUEST: 'bg-orange-100 text-orange-600',
}

const channelColors: Record<string, string> = {
  IN_APP: 'bg-gray-100 text-gray-600',
  EMAIL: 'bg-blue-100 text-blue-600',
  WHATSAPP: 'bg-green-100 text-green-600',
  SMS: 'bg-orange-100 text-orange-600',
  PUSH: 'bg-purple-100 text-purple-600',
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [notifications, setNotifications] = useState(initialNotifications)

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'all') return true
    if (filter === 'unread') return !n.read
    return n.read
  })

  const unreadCount = notifications.filter(n => !n.read).length

  const handleMarkRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">
            <Bell className="h-8 w-8 inline-block mr-2 text-primary" />
            Notifications
          </h1>
          <p className="text-muted-foreground mt-1">Stay updated with your appointments, offers, and rewards</p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark All Read ({unreadCount})
            </Button>
          )}
        </div>
      </div>

      <div className="flex gap-2 border-b border-glam-pink-200 pb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="appearance-none pr-8 pl-4 py-2 border border-glam-pink-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Notifications</option>
          <option value="unread">Unread Only</option>
          <option value="read">Read Only</option>
        </select>
        <div className="flex-1" />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Bell className="h-4 w-4" />
          {notifications.filter(n => !n.read).length} unread
        </div>
      </div>

      <div className="space-y-3">
        {filteredNotifications.map((notif) => (
          <div
            key={notif.id}
            className={cn(
              'card-elevated p-4 flex items-start gap-4 transition-all',
              !notif.read && 'bg-blue-50 border-primary/20'
            )}
          >
            <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center shrink-0', typeColors[notif.type])}>
              {(() => {
                const Icon = typeIcons[notif.type]
                return <Icon className="h-5 w-5" />
              })()}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h4 className={cn('font-medium', !notif.read && 'text-foreground', notif.read && 'text-muted-foreground')}>
                  {notif.title}
                </h4>
                <div className="flex items-center gap-2">
                  <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', channelColors[notif.channel])}>
                    {notif.channel}
                  </span>
                  {!notif.read && (
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  )}
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDateTime(notif.time)}
                  </span>
                </div>
              </div>

              <p className={cn('text-sm mt-1', !notif.read && 'text-foreground', notif.read && 'text-muted-foreground')}>
                {notif.message}
              </p>

              <div className="flex items-center gap-2 mt-3">
                {!notif.read && (
                  <Button variant="ghost" size="sm" onClick={() => setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n))}>
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Mark as Read
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setNotifications(prev => prev.filter(n => n.id !== notif.id))}>
                  <X className="h-3 w-3" />
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="card-elevated p-12 text-center">
            <Bell className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No notifications</h3>
            <p className="text-muted-foreground">You're all caught up!</p>
          </div>
        )}
      </div>

      <div className="card-elevated p-6">
        <h3 className="font-heading font-semibold text-lg mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {[
            { key: 'appointment', label: 'Appointment Confirmations', desc: 'Booking confirmations and reminders', channels: ['IN_APP', 'WHATSAPP', 'EMAIL'] },
            { key: 'offers', label: 'Promotional Offers', desc: 'New offers and discount codes', channels: ['IN_APP', 'EMAIL'] },
            { key: 'loyalty', label: 'Loyalty & Wallet', desc: 'Points earned, redeemed, wallet updates', channels: ['IN_APP', 'WHATSAPP'] },
            { key: 'referral', label: 'Referral Updates', desc: 'Referral rewards and friend activity', channels: ['IN_APP', 'EMAIL'] },
            { key: 'birthday', label: 'Birthday Offers', desc: 'Special birthday gifts and offers', channels: ['IN_APP', 'WHATSAPP', 'EMAIL'] },
            { key: 'membership', label: 'Membership', desc: 'Renewal reminders and benefit updates', channels: ['IN_APP', 'EMAIL'] },
            { key: 'review', label: 'Review Requests', desc: 'Post-appointment review invitations', channels: ['IN_APP', 'WHATSAPP'] },
          ].map((pref) => (
            <div key={pref.key} className="flex items-center justify-between p-4 rounded-lg bg-glam-pink-50">
              <div>
                <p className="font-medium text-foreground">{pref.label}</p>
                <p className="text-sm text-muted-foreground">{pref.desc}</p>
              </div>
              <div className="flex items-center gap-2">
                {pref.channels.map((ch) => (
                  <span key={ch} className={cn('px-2 py-1 rounded-full text-xs font-medium', channelColors[ch])}>
                    {ch}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}