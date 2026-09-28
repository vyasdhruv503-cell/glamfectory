'use client'

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const faqs = [
  {
    question: 'How do I book an appointment?',
    answer: 'You can book online through our website by clicking "Book Now", call us at +91 98765 43210, or message us on WhatsApp. We recommend booking at least 2-3 days in advance for your preferred time slot.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'We understand plans change. Please cancel or reschedule at least 4 hours before your appointment to avoid a 50% cancellation fee. No-shows will be charged the full service amount.',
  },
  {
    question: 'Do you offer bridal trial sessions?',
    answer: 'Yes! We highly recommend a bridal trial 4-6 weeks before your wedding day. The trial includes makeup and hair styling consultation. Trial cost is ₹2,000 which is adjusted in your final bridal package.',
  },
  {
    question: 'What products do you use?',
    answer: 'We use only premium international brands including L\'Oréal Professionnel, Wella, OPI, MAC, Kérastase, Moroccanoil, and Dermalogica. All products are authentic and purchased through authorized distributors.',
  },
  {
    question: 'Do you have membership plans?',
    answer: 'Yes! We offer Silver (₹5,000/year), Gold (₹12,000/year), and Platinum (₹25,000/year) memberships with discounts up to 30%, free services, priority booking, and exclusive perks.',
  },
  {
    question: 'Can I bring my own products?',
    answer: 'For best results and safety, we recommend using our professional products. However, if you have specific allergies or prescribed products, please discuss with your stylist during consultation.',
  },
  {
    question: 'Is parking available?',
    answer: 'Yes, Crystal Mall has ample basement and surface parking. The first 2 hours are free with validation from our salon.',
  },
  {
    question: 'Do you offer home services?',
    answer: 'Yes, home services are available for Gold and Platinum members within 10km radius. Additional charges apply based on distance and services booked.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept cash, all major credit/debit cards, UPI (Google Pay, PhonePe, Paytm), wallet balance, and Razorpay online payments.',
  },
  {
    question: 'Are your stylists certified?',
    answer: 'Absolutely! All our stylists are certified professionals with regular training from brands like L\'Oréal, Wella, and OPI. Many have 10+ years of experience.',
  },
  {
    question: 'Do you offer gift vouchers?',
    answer: 'Yes! Gift vouchers are available for any amount and can be purchased at the salon or online. They\'re valid for 12 months and can be used for any service or product.',
  },
  {
    question: 'What COVID-19 safety measures do you follow?',
    answer: 'We maintain hospital-grade hygiene: UV sterilization of tools, disposable items where possible, regular sanitization, mask-wearing, and limited occupancy. Your safety is our priority.',
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen py-16 pt-20">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Quick answers to common questions. Can\'t find what you\'re looking for?
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-6">Still have questions?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}