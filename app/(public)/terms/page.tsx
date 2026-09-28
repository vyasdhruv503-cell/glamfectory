'use client'

import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen py-16 pt-20">
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground mb-4">
            Terms & <span className="text-primary">Conditions</span>
          </h1>
          <p className="text-muted-foreground">Last updated: January 2024</p>
        </div>

        <div className="prose prose-glam-pink max-w-none space-y-8">
          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using The Glam Factory services, website, or booking system, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-4">2. Services</h2>
            <p>We provide professional beauty services including hair, skin, makeup, nails, waxing, spa, and bridal packages. Services are performed by certified professionals using premium products.</p>
            <p>Service results may vary based on individual hair/skin type, condition, and aftercare. We strive for excellence but cannot guarantee specific outcomes.</p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-4">3. Appointments & Booking</h2>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Appointments can be booked online, by phone, or WhatsApp</li>
              <li>We recommend booking 2-3 days in advance</li>
              <li>Walk-ins are welcome subject to availability</li>
              <li>Late arrivals may result in shortened service time</li>
              <li>We reserve the right to refuse service for safety reasons</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-4">4. Cancellation & Rescheduling</h2>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Free cancellation/rescheduling up to 4 hours before appointment</li>
              <li>50% charge for cancellations within 4 hours</li>
              <li>Full charge for no-shows</li>
              <li>Bridal packages: 30 days notice required for full refund</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-4">5. Pricing & Payment</h2>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Prices are in INR and include applicable taxes</li>
              <li>Prices may change without prior notice</li>
              <li>Accepted payments: Cash, Card, UPI, Wallet, Razorpay</li>
              <li>Gift vouchers valid for 12 months from purchase</li>
              <li>Membership fees are non-refundable after 30 days</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-4">6. Membership Plans</h2>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Memberships auto-renew unless cancelled</li>
              <li>Cancellation requires 30 days notice</li>
              <li>Benefits are non-transferable</li>
              <li>Free services expire annually and don't roll over</li>
              <li>Discounts cannot be combined with other offers</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-4">7. Loyalty & Referral Program</h2>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Points earned on paid services only</li>
              <li>Points expire after 12 months of inactivity</li>
              <li>Referral rewards issued after referee's first paid visit</li>
              <li>Program terms subject to change with notice</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-4">8. Health & Safety</h2>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Inform us of allergies, medical conditions, or medications</li>
              <li>Patch tests available for color/sensitive services</li>
              <li>We reserve the right to refuse service for health reasons</li>
              <li>Pregnant clients should consult their doctor before certain services</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-4">9. Liability</h2>
            <p>While we maintain the highest standards, The Glam Factory is not liable for:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Allergic reactions to products (patch tests recommended)</li>
              <li>Dissatisfaction with subjective results</li>
              <li>Damage to personal belongings</li>
              <li>Services performed against professional advice</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-4">10. Intellectual Property</h2>
            <p>All content, logos, images, and branding are property of The Glam Factory. Unauthorized use is prohibited.</p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-4">11. Governing Law</h2>
            <p>These terms are governed by the laws of India. Disputes subject to Vadodara, Gujarat jurisdiction.</p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-4">12. Changes to Terms</h2>
            <p>We may update these terms periodically. Continued use constitutes acceptance of changes.</p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-4">13. Contact</h2>
            <p>For questions about these terms:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Email: legal@theglamfactory.in</li>
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