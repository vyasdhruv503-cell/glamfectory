'use client'

import { Navbar } from '@/components/public/navbar'
import { Footer } from '@/components/public/footer'
import { WhatsAppButton } from '@/components/public/whatsapp-button'
import { ReactNode } from 'react'

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}