'use client'

import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-16 pt-20">
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground mb-4">
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="text-muted-foreground">Last updated: January 2024</p>
        </div>

        <div className="prose prose-glam-pink max-w-none space-y-8">
          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-4">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, including:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Personal details (name, email, phone number)</li>
              <li>Appointment history and preferences</li>
              <li>Payment information (processed securely via Razorpay)</li>
              <li>Communication records (WhatsApp, email, phone)</li>
              <li>Feedback and reviews</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-4">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Book and manage appointments</li>
              <li>Send appointment reminders and confirmations</li>
              <li>Process payments securely</li>
              <li>Send promotional offers (with your consent)</li>
              <li>Improve our services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-4">3. Data Sharing</h2>
            <p>We do not sell your personal information. We may share data with:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Payment processors (Razorpay) for transactions</li>
              <li>WhatsApp Business API for notifications</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-4">4. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your data, including encryption, secure servers, and access controls.</p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-4">5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-4">6. Cookies</h2>
            <p>We use cookies to enhance your experience, analyze traffic, and remember preferences. You can control cookies through your browser settings.</p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-4">7. Contact Us</h2>
            <p>For privacy concerns, contact us at:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Email: privacy@theglamfactory.in</li>
              <li>Phone: +91 98765 43210</li>
              <li>Address: 2nd Floor, Crystal Mall, Race Course Road, Vadodara - 390007</li>
            </ul>
          </section>
        </div>

        <div className="text-center mt-12">
          <Link href="/" className="text-primary hover:underline font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}