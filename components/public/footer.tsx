import Link from 'next/link'
import { Facebook, Instagram, MessageSquare, MapPin, Phone, Mail, Sparkles, Award } from 'lucide-react'
import { cn } from '@/lib/utils'

const footerLinks = {
  quick: [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/offers', label: 'Offers' },
    { href: '/team', label: 'Our Team' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ],
  services: [
    { href: '/services?category=hair', label: 'Hair Services' },
    { href: '/services?category=skin', label: 'Skin Care' },
    { href: '/services?category=makeup', label: 'Makeup' },
    { href: '/services?category=bridal', label: 'Bridal Packages' },
    { href: '/services?category=nails', label: 'Nail Art' },
    { href: '/services?category=waxing', label: 'Waxing' },
    { href: '/services?category=spa', label: 'Spa & Massage' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms & Conditions' },
    { href: '/faq', label: 'FAQ' },
  ],
}

const socialLinks = [
  { href: 'https://instagram.com/theglamfactory', icon: Instagram, label: 'Instagram' },
  { href: 'https://facebook.com/theglamfactory', icon: Facebook, label: 'Facebook' },
  { href: 'https://wa.me/919876543210', icon: MessageSquare, label: 'WhatsApp' },
]

export function Footer() {
  return (
    <footer className="bg-glam-pink-50 border-t border-glam-pink-200" role="contentinfo">
      <div className="container-custom py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6" aria-label="The Glam Factory Home">
              <div className="h-12 w-12 rounded-xl gradient-pink flex items-center justify-center shadow-lg">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <span className="font-heading font-bold text-2xl text-foreground">
                THE <span className="text-primary">GLAM</span> FACTORY
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Vadodara&apos;s premium beauty destination. Expert stylists, premium products, and personalized care for your perfect look.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <nav aria-label="Quick links">
              <ul className="space-y-2">
                {footerLinks.quick.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <nav aria-label="Services">
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <address className="not-italic space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                <p>
                  2nd Floor, Crystal Mall,<br />
                  Race Course Road, Vadodara - 390007<br />
                  Gujarat, India
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                <a href="tel:+919876543210" className="hover:text-primary transition-colors">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                <a href="mailto:info@theglamfactory.in" className="hover:text-primary transition-colors">
                  info@theglamfactory.in
                </a>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-glam-pink-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} The Glam Factory. All rights reserved.
            </p>
            <nav aria-label="Legal">
              <ul className="flex flex-wrap items-center gap-4">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors animate-pulse"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="h-7 w-7" />
        </a>
      </div>
    </footer>
  )
}