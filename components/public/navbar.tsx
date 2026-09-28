'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, ShoppingBag, Sparkles, Shield, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/offers', label: 'Offers' },
  { href: '/team', label: 'Our Team' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { data: session } = useSession()

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setScrolled(window.scrollY > 20)
    })
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <nav className="container-custom" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="The Glam Factory Home">
            <div className="h-10 w-10 rounded-xl gradient-pink flex items-center justify-center shadow-md">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-foreground">
              THE <span className="text-primary">GLAM</span> FACTORY
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {session ? (
              session.user?.role === 'ADMIN' ? (
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/5 font-semibold" asChild>
                  <Link href="/admin">
                    <Shield className="mr-1.5 h-4 w-4" />
                    Admin Panel
                  </Link>
                </Button>
              ) : (
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/account">
                    <User className="mr-1.5 h-4 w-4" />
                    My Account
                  </Link>
                </Button>
              )
            ) : (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
            )}
            <Button size="sm" asChild>
              <Link href="/booking">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Book Now
              </Link>
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div
          id="mobile-menu"
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-2 py-2 text-base font-medium text-foreground/80 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t flex flex-col gap-2">
              {session ? (
                session.user?.role === 'ADMIN' ? (
                  <Button variant="outline" className="w-full border-primary text-primary font-semibold" asChild>
                    <Link href="/admin" onClick={() => setIsOpen(false)}>
                      <Shield className="mr-1.5 h-4 w-4" />
                      Admin Panel
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/account" onClick={() => setIsOpen(false)}>
                      <User className="mr-1.5 h-4 w-4" />
                      My Account
                    </Link>
                  </Button>
                )
              ) : (
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/auth/login" onClick={() => setIsOpen(false)}>Sign In</Link>
                </Button>
              )}
              <Button className="w-full" asChild>
                <Link href="/booking" onClick={() => setIsOpen(false)}>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Book Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}