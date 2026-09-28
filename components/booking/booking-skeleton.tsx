'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function BookingSkeleton() {
  return (
    <div className="min-h-screen py-16 pt-20">
      <div className="container-custom">
        <div className="mb-8">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-4" />
          <Skeleton className="h-12 w-96 mt-2" />
          <Skeleton className="h-4 w-80 mt-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="card-elevated overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <div className="p-5 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}