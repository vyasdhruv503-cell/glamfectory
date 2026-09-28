import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Nunito } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Glam Factory - Premium Beauty Salon in Vadodara',
  description: 'Experience luxury beauty services at The Glam Factory. Expert stylists, premium products, and personalized care in Vadodara, Gujarat.',
  keywords: ['beauty salon', 'hair salon', 'makeup artist', 'bridal makeup', 'spa', 'vadodara', 'glam factory'],
  authors: [{ name: 'The Glam Factory' }],
  creator: 'The Glam Factory',
  publisher: 'The Glam Factory',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://theglamfactory.in',
    title: 'The Glam Factory - Premium Beauty Salon in Vadodara',
    description: 'Experience luxury beauty services at The Glam Factory. Expert stylists, premium products, and personalized care.',
    siteName: 'The Glam Factory',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Glam Factory Salon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Glam Factory - Premium Beauty Salon in Vadodara',
    description: 'Experience luxury beauty services at The Glam Factory.',
    images: ['/images/og-image.jpg'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'hsl(var(--background))' },
    { media: '(prefers-color-scheme: dark)', color: 'hsl(340 15% 8%)' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${nunito.variable} font-body antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}