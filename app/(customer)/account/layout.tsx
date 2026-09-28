'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Calendar, Wallet, CreditCard, Tag, Users, Bell, User, LogOut, ChevronRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { signOut, useSession } from 'next-auth/react'
import { Shield } from 'lucide-react'

const navItems = [
  { href: '/account', label: 'Overview', icon: LayoutDashboard },
  { href: '/account/appointments', label: 'Appointments', icon: Calendar },
  { href: '/account/loyalty', label: 'Loyalty & Wallet', icon: Wallet },
  { href: '/account/membership', label: 'Membership', icon: CreditCard },
  { href: '/account/offers', label: 'My Offers', icon: Tag },
  { href: '/account/referrals', label: 'Referrals', icon: Users },
  { href: '/account/notifications', label: 'Notifications', icon: Bell },
  { href: '/account/profile', label: 'Profile', icon: User },
]

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'ADMIN'

  return (
    <div className="min-h-screen bg-glam-pink-50 flex flex-col">
      {isAdmin && (
        <div className="bg-gradient-to-r from-purple-700 to-pink-600 text-white px-4 py-2 text-xs flex items-center justify-between z-50 shadow-sm">
          <span className="flex items-center gap-1.5 font-medium">
            <Shield className="h-4 w-4 text-purple-200" />
            Admin Account ({session?.user?.email}) &bull; Viewing Customer Account View
          </span>
          <Link href="/admin" className="bg-white text-purple-900 font-bold px-3 py-1 rounded-md text-xs hover:bg-purple-100 transition-colors shadow-sm">
            Open Admin Dashboard &rarr;
          </Link>
        </div>
      )}

      <div className="flex-1 flex min-h-0">
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-glam-pink-200 transform transition-transform duration-300 lg:translate-x-0',
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
            isAdmin ? 'top-8' : ''
          )}
          aria-label="Account navigation"
        >
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-glam-pink-200">
              <Link href="/account" className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-xl gradient-pink flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="font-heading font-bold text-xl text-foreground">
                  THE <span className="text-primary">GLAM</span> FACTORY
                </span>
              </Link>
              <p className="text-sm text-muted-foreground mt-2">My Account</p>
            </div>

            {isAdmin && (
              <div className="p-3 m-3 rounded-xl bg-purple-50 border border-purple-200">
                <p className="text-xs font-bold text-purple-900 mb-1 flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5 text-purple-600" />
                  Admin Controls
                </p>
                <p className="text-[11px] text-purple-700 mb-2">Switch back to manage appointments & staff.</p>
                <Button size="sm" className="w-full h-8 text-xs bg-purple-600 hover:bg-purple-700 text-white" asChild>
                  <Link href="/admin">Admin Dashboard &rarr;</Link>
                </Button>
              </div>
            )}

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto" aria-label="Account menu">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all',
                    pathname === item.href
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-muted-foreground hover:bg-glam-pink-50 hover:text-foreground'
                  )}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-glam-pink-200">
              <div className="text-xs text-muted-foreground mb-2 truncate px-1">
                {session?.user?.email || 'Logged in'}
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-destructive hover:bg-red-50"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </Button>
            </div>
          </div>
        </aside>

        <div className="flex-1 lg:ml-64 min-w-0">
          <header className="sticky top-0 z-40 bg-white border-b border-glam-pink-200 lg:hidden">
          <div className="flex h-16 items-center justify-between px-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg text-foreground hover:bg-glam-pink-50"
              aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isSidebarOpen}
            >
              {isSidebarOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            <Link href="/account" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl gradient-pink flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-heading font-bold text-lg text-foreground">
                THE <span className="text-primary">GLAM</span> FACTORY
              </span>
            </Link>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  )
}