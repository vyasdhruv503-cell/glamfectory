'use client'

import { Button } from '@/components/ui/button'
import { Users, Gift, ArrowRight, Copy, CheckCircle, Share2, Calendar, Clock, Trophy, Star } from 'lucide-react'
import { cn, formatDate, formatCurrency, formatDateTime } from '@/lib/utils'

const referralData = {
  code: 'PRIYA2024',
  totalReferrals: 12,
  completedReferrals: 8,
  pendingReferrals: 4,
  totalEarned: 800,
  totalGiven: 400,
}

const referralProgram = {
  referrerReward: 100,
  refereeReward: 50,
  minAppointmentValue: 500,
}

const referrals = [
  { id: '1', name: 'Anjali S.', email: 'anjali@email.com', phone: '+91 98765 43211', status: 'COMPLETED', date: '2024-11-15', rewardGiven: true, appointmentValue: 2500 },
  { id: '2', name: 'Rohit K.', email: 'rohit@email.com', phone: '+91 98765 43212', status: 'COMPLETED', date: '2024-10-28', rewardGiven: true, appointmentValue: 3200 },
  { id: '3', name: 'Meera P.', email: 'meera@email.com', phone: '+91 98765 43213', status: 'COMPLETED', date: '2024-10-10', rewardGiven: true, appointmentValue: 1800 },
  { id: '4', name: 'Kavya R.', email: 'kavya@email.com', phone: '+91 98765 43214', status: 'COMPLETED', date: '2024-09-20', rewardGiven: true, appointmentValue: 4500 },
  { id: '5', name: 'Sneha M.', email: 'sneha@email.com', phone: '+91 98765 43215', status: 'COMPLETED', date: '2024-08-15', rewardGiven: true, appointmentValue: 2200 },
  { id: '6', name: 'Priya D.', email: 'priya.d@email.com', phone: '+91 98765 43216', status: 'COMPLETED', date: '2024-07-20', rewardGiven: true, appointmentValue: 3000 },
  { id: '7', name: 'Arjun T.', email: 'arjun@email.com', phone: '+91 98765 43217', status: 'COMPLETED', date: '2024-06-25', rewardGiven: true, appointmentValue: 1500 },
  { id: '8', name: 'Divya S.', email: 'divya@email.com', phone: '+91 98765 43218', status: 'COMPLETED', date: '2024-06-10', rewardGiven: true, appointmentValue: 2800 },
  { id: '9', name: 'Rahul K.', email: 'rahul@email.com', phone: '+91 98765 43219', status: 'PENDING', date: '2024-12-10', rewardGiven: false, appointmentValue: 0 },
  { id: '10', name: 'Pooja V.', email: 'pooja@email.com', phone: '+91 98765 43220', status: 'PENDING', date: '2024-12-05', rewardGiven: false, appointmentValue: 0 },
  { id: '11', name: 'Amit S.', email: 'amit@email.com', phone: '+91 98765 43221', status: 'PENDING', date: '2024-12-01', rewardGiven: false, appointmentValue: 0 },
  { id: '12', name: 'Neha G.', email: 'neha@email.com', phone: '+91 98765 43222', status: 'PENDING', date: '2024-11-28', rewardGiven: false, appointmentValue: 0 },
]

export default function ReferralsPage() {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralData.code)
    alert(`Referral code "${referralData.code}" copied!`)
  }

  const handleShare = async () => {
    const text = `Join me at The Glam Factory! Use my code ${referralData.code} and get ₹50 off your first visit. I'll get ₹100 too! Book at https://theglamfactory.in/booking`
    if (navigator.share) {
      await navigator.share({ title: 'Join me at The Glam Factory', text })
    } else {
      await navigator.clipboard.writeText(text)
      alert('Referral link copied to clipboard!')
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">
            Referrals & <span className="text-primary">Rewards</span>
          </h1>
          <p className="text-muted-foreground mt-1">Share your code, earn rewards for every friend who books</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Your Referral Code</p>
              <div className="flex items-center gap-2 mt-1">
                <code className="font-mono text-2xl font-bold text-primary tracking-wider">{referralData.code}</code>
                <Button variant="ghost" size="icon" className="h-10 w-10" onClick={handleCopyCode}>
                  <Copy className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Share this code with friends. They get ₹{referralProgram.refereeReward} off, you get ₹{referralProgram.referrerReward}!</p>
          <div className="mt-4 flex gap-2">
            <Button onClick={handleCopyCode} className="flex-1">
              <Copy className="mr-2 h-4 w-4" />
              Copy Code
            </Button>
            <Button variant="outline" onClick={handleShare} className="flex-1">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <div className="card-elevated p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Earned</p>
          <p className="font-heading font-bold text-3xl text-green-600">{formatCurrency(referralData.totalEarned)}</p>
          <p className="text-xs text-muted-foreground mt-1">{referralData.completedReferrals} successful referrals</p>
        </div>

        <div className="card-elevated p-6">
          <p className="text-sm text-muted-foreground mb-2">Friends Referred</p>
          <p className="font-heading font-bold text-3xl text-primary">{referralData.totalReferrals}</p>
          <p className="text-xs text-muted-foreground mt-1">{referralData.pendingReferrals} pending, {referralData.completedReferrals} completed</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-elevated p-6">
          <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            How It Works
          </h3>
          <div className="space-y-4">
            {[
              { step: 1, title: 'Share Your Code', desc: 'Send your unique code to friends via WhatsApp, SMS, or social media' },
              { step: 2, title: 'Friend Books', desc: 'They use your code at checkout and get ₹50 off their first visit (min. ₹500)' },
              { step: 3, title: 'You Earn', desc: 'You get ₹100 in wallet after their first paid appointment' },
            ].map((step) => (
              <div key={step.step} className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="font-bold text-primary">{step.step}</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{step.title}</p>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-elevated p-6 md:col-span-2">
          <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-glam-gold-600" />
            Referral Leaderboard
          </h3>
          <div className="space-y-3">
            {[
              { rank: 1, name: 'Priya P.', referrals: 24, earned: 2400 },
              { rank: 2, name: 'Anjali S.', referrals: 18, earned: 1800 },
              { rank: 3, name: 'Rohit K.', referrals: 15, earned: 1500 },
              { rank: 4, name: 'You', referrals: 12, earned: 800, current: true },
              { rank: 5, name: 'Meera P.', referrals: 10, earned: 1000 },
            ].map((item) => (
              <div key={item.rank} className={cn(
                'flex items-center gap-4 p-3 rounded-lg',
                item.current && 'bg-primary/10 border border-primary/20'
              )}>
                <div className={cn('w-8 h-8 rounded-full flex items-center justify-center font-bold', item.rank <= 3 ? 'bg-glam-gold-500 text-white' : 'bg-glam-pink-100 text-primary')}>
                  {item.rank}
                </div>
                <div className="flex-1">
                  <p className={cn('font-medium', item.current && 'text-primary')}>{item.name}{item.current && ' (You)'}</p>
                  <p className="text-xs text-muted-foreground">{item.referrals} referrals • {formatCurrency(item.earned)} earned</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card-elevated">
        <div className="p-6 border-b border-glam-pink-200">
          <h3 className="font-heading font-semibold text-lg">Your Referrals</h3>
        </div>
        <div className="divide-y divide-glam-pink-200">
          {referrals.map((ref) => (
            <div key={ref.id} className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">{ref.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{ref.name}</p>
                  <p className="text-sm text-muted-foreground">{ref.email} · {ref.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className={cn(
                  'px-3 py-1 rounded-full text-xs font-medium',
                  ref.status === 'COMPLETED' && 'bg-green-100 text-green-800',
                  ref.status === 'PENDING' && 'bg-yellow-100 text-yellow-800',
                  ref.status === 'EXPIRED' && 'bg-gray-100 text-gray-800'
                )}>
                  {ref.status}
                </span>
                <span className="text-muted-foreground">Referred: {formatDate(ref.date)}</span>
                {ref.status === 'COMPLETED' && (
                  <>
                    <span className="text-green-600 font-medium">+₹{referralProgram.referrerReward} earned</span>
                    <span className="text-muted-foreground">Appt: {formatCurrency(ref.appointmentValue)}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-elevated p-6 bg-glam-pink-50 border-glam-pink-200">
        <h3 className="font-heading font-semibold text-lg mb-4">Terms & Conditions</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> Minimum appointment value: ₹{referralProgram.minAppointmentValue}</li>
          <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> Referrer reward: ₹{referralProgram.referrerReward} (added to wallet after referee's first paid visit)</li>
          <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> Referee reward: ₹{referralProgram.refereeReward} off first visit</li>
          <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> Rewards issued within 24 hours of appointment completion</li>
          <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /> No limit on number of referrals</li>
        </ul>
      </div>
    </div>
  )
}