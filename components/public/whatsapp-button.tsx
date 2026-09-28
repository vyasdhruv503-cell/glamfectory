'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowPrompt(true), 10000)
    return () => clearTimeout(timer)
  }, [])

  const handleWhatsAppClick = (message?: string) => {
    const phoneNumber = '919876543210'
    const defaultMessage = 'Hi! I would like to book an appointment at The Glam Factory.'
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message || defaultMessage)}`
    window.open(url, '_blank')
    setIsOpen(false)
  }

  return (
    <>
      <button
        className={cn(
          'fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all hover:bg-green-600 hover:scale-105',
          'animate-bounce'
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close WhatsApp chat' : 'Open WhatsApp chat'}
      >
        {isOpen ? <X className="h-7 w-7" /> : <MessageSquare className="h-7 w-7" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 animate-slide-up">
          <div className="bg-white rounded-xl shadow-lg border border-glam-pink-200 overflow-hidden">
            <div className="bg-green-500 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="font-semibold text-white">The Glam Factory</p>
                  <p className="text-xs text-green-100">Typically replies within minutes</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-green-100"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <button
                onClick={() => handleWhatsAppClick('Hi! I would like to book an appointment.')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-glam-pink-50 hover:bg-glam-pink-100 transition-colors text-left"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-foreground">Book Appointment</span>
              </button>
              <button
                onClick={() => handleWhatsAppClick('Hi! I have a query about your services.')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-glam-pink-50 hover:bg-glam-pink-100 transition-colors text-left"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-foreground">General Inquiry</span>
              </button>
              <button
                onClick={() => handleWhatsAppClick('Hi! I would like to know about bridal packages.')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-glam-pink-50 hover:bg-glam-pink-100 transition-colors text-left"
              >
                <div className="h-10 w-10 rounded-lg bg-glam-gold-500/10 flex items-center justify-center">
                  <svg className="h-5 w-5 text-glam-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888a1 1 0 00.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-foreground">Bridal Packages</span>
              </button>
              <button
                onClick={() => handleWhatsAppClick('Hi! I want to know about current offers.')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-glam-pink-50 hover:bg-glam-pink-100 transition-colors text-left"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-foreground">Current Offers</span>
              </button>
            </div>
            <div className="px-4 py-3 border-t border-glam-pink-200">
              <p className="text-xs text-muted-foreground text-center">
                By continuing, you agree to our <a href="/privacy" className="text-primary underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      )}

      {showPrompt && !isOpen && (
        <div className="fixed bottom-24 right-6 z-40 animate-slide-up">
          <div className="bg-white rounded-xl shadow-lg border border-glam-pink-200 p-4 w-72">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <span className="font-medium">The Glam Factory</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-green-500 text-xs">Online now</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">How can we help you today?</p>
            <button
              onClick={() => { setIsOpen(true); setShowPrompt(false); }}
              className="mt-3 w-full text-sm font-medium text-primary hover:underline"
            >
              Tap to chat
            </button>
          </div>
        </div>
      )}
    </>
  )
}