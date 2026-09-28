'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { MapPin, Phone, Mail, Clock, MessageSquare, CheckCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: '2nd Floor, Crystal Mall, Race Course Road, Vadodara - 390007, Gujarat, India',
    link: null,
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: '+91 98765 43210',
    link: 'tel:+919876543210',
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: 'info@theglamfactory.in',
    link: 'mailto:info@theglamfactory.in',
  },
  {
    icon: Clock,
    title: 'Opening Hours',
    details: 'Mon - Sat: 10:00 AM - 8:00 PM\nSunday: 11:00 AM - 6:00 PM',
    link: null,
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    toast.success('Message sent successfully! We\'ll get back to you within 24 hours.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen py-16 pt-20">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground mb-4">
            <span className="text-primary">Contact</span> Us
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Have a question or want to book an appointment? We\'d love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((item) => (
              <div key={item.title} className="card-elevated p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {item.details}
                    </p>
                    {item.link && (
                      <a href={item.link} className="mt-2 inline-block text-sm text-primary hover:underline">
                        {item.title === 'Call Us' ? 'Tap to call' : 'Send email'}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="card-elevated p-6 bg-glam-pink-50 border-glam-pink-200">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-glam-gold-500/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="h-6 w-6 text-glam-gold-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">WhatsApp Us</h3>
                  <p className="text-sm text-muted-foreground mb-3">Quick response for bookings & queries</p>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="card-elevated p-8">
              <h2 className="font-heading font-bold text-2xl mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="input-field"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="booking">Appointment Booking</option>
                      <option value="inquiry">General Inquiry</option>
                      <option value="bridal">Bridal Packages</option>
                      <option value="offers">Current Offers</option>
                      <option value="membership">Membership Plans</option>
                      <option value="feedback">Feedback / Complaint</option>
                      <option value="careers">Careers</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <CheckCircle className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        <section aria-labelledby="map-heading" className="rounded-xl overflow-hidden">
          <h2 id="map-heading" className="sr-only">Our Location</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3700.123456789!2d73.181234!3d22.307123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc7c8b4a1b2c3%3A0x123456789abcdef!2sCrystal%20Mall%20Vadodara!5e0!3m2!1sen!2sin!4v1234567890123"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="The Glam Factory Location"
          />
        </section>
      </div>
    </div>
  )
}