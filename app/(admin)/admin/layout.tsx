'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Calendar, Users, Scissors, UserPlus, Tag, Crown, Image, Star, CreditCard, Settings, LogOut, ChevronRight, Sparkles, Menu, X, BarChart2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { signOut } from 'next-auth/react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/appointments', label: 'Appointments', icon: Calendar },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/services', label: 'Services', icon: Scissors },
  { href: '/admin/staff', label: 'Staff', icon: UserPlus },
  { href: '/admin/offers', label: 'Offers', icon: Tag },
  { href: '/admin/memberships', label: 'Memberships', icon: Crown },
  { href: '/admin/gallery', label: 'Gallery', icon: Image },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
  { href: '/admin/payments', label: 'Payments', icon: CreditCard },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-glam-pink-50 flex">
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-glam-pink-200 transform transition-transform duration-300 lg:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-label="Admin navigation"
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-glam-pink-200">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl gradient-pink flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-foreground">
                THE <span className="text-primary">GLAM</span> FACTORY
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">Admin Panel</p>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto" aria-label="Admin menu">
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
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-destructive hover:bg-red-50"
              onClick={() => signOut({ callbackUrl: '/auth/login' })}
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
              {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Link href="/admin" className="flex items-center gap-2">
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
  )
}