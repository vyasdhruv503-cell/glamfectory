'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Wallet, ArrowDown, ArrowUp, Sparkles, Gift, Clock, CreditCard, ArrowRight, Plus, Minus } from 'lucide-react'
import { cn, formatCurrency, formatDateTime } from '@/lib/utils'

const loyaltyData = {
  points: 2450,
  tier: 'Gold',
  nextTier: 'Platinum',
  pointsToNext: 550,
  lifetimeEarned: 8500,
  lifetimeRedeemed: 3200,
}

const walletData = {
  balance: 1200,
  totalEarned: 5000,
  totalRedeemed: 3800,
}

const loyaltyTransactions = [
  { id: '1', date: '2024-12-10', type: 'EARNED', amount: 250, description: 'Gold Facial appointment', balance: 2450 },
  { id: '2', date: '2024-12-05', type: 'REDEEMED', amount: -500, description: 'Redeemed for ₹250 off', balance: 2200 },
  { id: '3', date: '2024-11-28', type: 'EARNED', amount: 180, description: 'Haircut & Styling', balance: 2700 },
  { id: '4', date: '2024-11-15', type: 'EARNED', amount: 60, description: 'Gel Manicure', balance: 2520 },
  { id: '5', date: '2024-11-01', type: 'BONUS', amount: 500, description: 'Birthday bonus points', balance: 2460 },
  { id: '6', date: '2024-10-20', type: 'EARNED', amount: 200, description: 'Swedish Massage', balance: 1960 },
  { id: '7', date: '2024-10-10', type: 'REDEEMED', amount: -300, description: 'Redeemed for ₹150 off', balance: 1760 },
  { id: '8', date: '2024-09-25', type: 'EARNED', amount: 350, description: 'HD Makeup', balance: 2060 },
]

const walletTransactions = [
  { id: '1', date: '2024-12-01', type: 'CREDIT', amount: 500, description: 'Wallet top-up via UPI', balance: 1200 },
  { id: '2', date: '2024-11-20', type: 'DEBIT', amount: -800, description: 'Gel Manicure payment', balance: 700 },
  { id: '3', date: '2024-11-10', type: 'CREDIT', amount: 1000, description: 'Wallet top-up via Card', balance: 1500 },
  { id: '4', date: '2024-10-25', type: 'DEBIT', amount: -2000, description: 'Swedish Massage payment', balance: 500 },
  { id: '5', date: '2024-10-01', type: 'CREDIT', amount: 200, description: 'Referral reward', balance: 2500 },
]

const tiers = [
  { name: 'Silver', minPoints: 0, discount: 10, freeServices: 2, color: 'bg-gray-300' },
  { name: 'Gold', minPoints: 1000, discount: 20, freeServices: 4, color: 'bg-glam-gold-500' },
  { name: 'Platinum', minPoints: 3000, discount: 30, freeServices: 8, color: 'bg-purple-600' },
]

export default function LoyaltyPage() {
  const [activeTab, setActiveTab] = useState<'points' | 'wallet' | 'history'>('points')

  const currentTier = tiers.find(t => t.name === loyaltyData.tier)!
  const nextTier = tiers.find(t => t.minPoints > loyaltyData.points)!

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">
            Loyalty & <span className="text-primary">Wallet</span>
          </h1>
          <p className="text-muted-foreground mt-1">Track your points, wallet balance, and rewards</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-elevated p-6 relative overflow-hidden">
          <div className="absolute top-4 right-4 opacity-10">
            <Sparkles className="h-16 w-16 text-primary" />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Loyalty Points</p>
              <p className="font-heading font-bold text-4xl text-primary mt-1">{loyaltyData.points.toLocaleString()}</p>
            </div>
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Current Tier</span>
                <span className="font-semibold text-foreground">{loyaltyData.tier}</span>
              </div>
              <div className="h-2 bg-glam-pink-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${(loyaltyData.points / nextTier.minPoints) * 100}%` }} />
              </div>
              <p className="text-xs text-muted-foreground">{loyaltyData.pointsToNext} points to {nextTier?.name || 'Max Tier'}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
              <div>
                <p className="text-xs text-muted-foreground">Lifetime Earned</p>
                <p className="font-medium">{loyaltyData.lifetimeEarned.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Lifetime Redeemed</p>
                <p className="font-medium">{loyaltyData.lifetimeRedeemed.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card-elevated p-6 md:col-span-2">
          <h3 className="font-heading font-semibold text-lg mb-4">Your Tiers Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  'card-elevated p-6 relative',
                  tier.name === loyaltyData.tier && 'border-primary/50 shadow-lg shadow-primary/10'
                )}
              >
                {tier.name === loyaltyData.tier && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-white text-sm font-medium">
                    Current Tier
                  </div>
                )}
                <div className="text-center mb-4">
                  <div className={cn('h-16 w-16 rounded-2xl mx-auto mb-3 flex items-center justify-center', tier.color)}>
                    <span className="font-heading font-bold text-2xl text-white">{tier.name.charAt(0)}</span>
                  </div>
                  <h4 className="font-heading font-bold text-xl">{tier.name}</h4>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <CreditCard className="h-4 w-4 text-primary" />
                    <span>{tier.discount}% off all services</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Gift className="h-4 w-4 text-glam-gold-600" />
                    <span>{tier.freeServices} free services/year</span>
                  </div>
                </div>
                <div className="h-2 bg-glam-pink-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${(loyaltyData.points / 3000) * 100}%` }} />
                </div>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  {loyaltyData.points >= tier.minPoints ? 'Unlocked' : `${tier.minPoints - loyaltyData.points} points to unlock`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card-elevated p-6">
        <h3 className="font-heading font-semibold text-lg mb-4">Wallet Balance</h3>
        <div className="flex items-center justify-between mb-6 p-4 rounded-xl bg-glam-pink-50">
          <div className="h-14 w-14 rounded-xl bg-glam-gold-500/10 flex items-center justify-center">
            <Wallet className="h-7 w-7 text-glam-gold-600" />
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Available Balance</p>
            <p className="font-heading font-bold text-3xl text-foreground">{formatCurrency(walletData.balance)}</p>
          </div>
          <Button variant="outline" className="h-10" asChild>
            <Link href="/account/loyalty/topup">Top Up</Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-green-50">
            <p className="text-xs text-green-700 uppercase tracking-wide">Total Added</p>
            <p className="font-heading font-bold text-xl text-green-600">{formatCurrency(walletData.totalEarned)}</p>
          </div>
          <div className="p-4 rounded-xl bg-red-50">
            <p className="text-xs text-red-700 uppercase tracking-wide">Total Spent</p>
            <p className="font-heading font-bold text-xl text-red-600">{formatCurrency(walletData.totalRedeemed)}</p>
          </div>
        </div>

        <Button variant="outline" className="w-full" asChild>
          <Link href="/account/loyalty/topup">
            <Plus className="mr-2 h-4 w-4" />
            Add Money to Wallet
          </Link>
        </Button>
      </div>

      <div className="card-elevated">
        <div className="p-6 border-b border-glam-pink-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="font-heading font-semibold text-lg">Transaction History</h3>
          <div className="flex items-center gap-2">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as any)}
              className="px-3 py-2 border border-glam-pink-200 rounded-lg bg-white text-sm"
            >
              <option value="points">Loyalty Points</option>
              <option value="wallet">Wallet</option>
              <option value="history">All Transactions</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-glam-pink-200">
          {(activeTab === 'points' ? loyaltyTransactions : activeTab === 'wallet' ? walletTransactions : [...loyaltyTransactions, ...walletTransactions]).map((txn) => (
            <div key={txn.id} className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={cn(
                  'h-12 w-12 rounded-xl flex items-center justify-center',
                  txn.type === 'EARNED' || txn.type === 'CREDIT' ? 'bg-green-100' :
                  txn.type === 'REDEEMED' || txn.type === 'DEBIT' ? 'bg-red-100' :
                  'bg-glam-gold-500/10'
                )}>
                  {txn.type === 'EARNED' || txn.type === 'CREDIT' ? (
                    <ArrowUp className="h-6 w-6 text-green-600" />
                  ) : txn.type === 'REDEEMED' || txn.type === 'DEBIT' ? (
                    <ArrowDown className="h-6 w-6 text-red-600" />
                  ) : (
                    <Gift className="h-6 w-6 text-glam-gold-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">{txn.description}</p>
                  <p className="text-sm text-muted-foreground">{formatDateTime(txn.date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-right sm:text-left">
                <div>
                  <p className={cn(
                    'font-heading font-bold',
                    txn.type === 'EARNED' || txn.type === 'CREDIT' ? 'text-green-600' : 'text-red-600'
                  )}>
                    {txn.amount > 0 ? '+' : ''}{txn.amount > 0 && txn.type !== 'REDEEMED' && txn.type !== 'DEBIT' ? formatCurrency(txn.amount) : txn.type === 'REDEEMED' || txn.type === 'DEBIT' ? formatCurrency(Math.abs(txn.amount)) : txn.amount + ' pts'}
                  </p>
                  <p className="text-xs text-muted-foreground">Balance: {txn.balance > 100 ? formatCurrency(txn.balance) : txn.balance + ' pts'}</p>
                </div>
                <span className={cn(
                  'px-2 py-1 rounded-full text-xs font-medium',
                  txn.type === 'EARNED' || txn.type === 'CREDIT' ? 'bg-green-100 text-green-800' :
                  txn.type === 'REDEEMED' || txn.type === 'DEBIT' ? 'bg-red-100 text-red-800' :
                  'bg-glam-gold-100 text-glam-gold-800'
                )}>
                  {txn.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}