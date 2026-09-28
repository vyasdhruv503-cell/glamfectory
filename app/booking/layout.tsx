import { Suspense } from 'react'
import { BookingSkeleton } from '@/components/booking/booking-skeleton'

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<BookingSkeleton />}>
      {children}
    </Suspense>
  )
}