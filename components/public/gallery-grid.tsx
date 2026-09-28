'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Expand, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GalleryItem {
  id: string
  title: string
  mediaUrl: string
  mediaType: 'PHOTO' | 'VIDEO' | 'BEFORE_AFTER'
  category?: string
}

interface GalleryGridProps {
  items: GalleryItem[]
  columns?: 2 | 3 | 4
  showCategoryFilter?: boolean
  categories?: string[]
}

export function GalleryGrid({ items, columns = 3, showCategoryFilter = false, categories = [] }: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedImage, setExpandedImage] = useState<string | null>(null)
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set())

  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter(item => item.category === selectedCategory)

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  const handleImageLoad = (src: string) => {
    setLoadingImages(prev => {
      const next = new Set(prev)
      next.delete(src)
      return next
    })
  }

  return (
    <div className="space-y-8">
      {showCategoryFilter && categories.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Gallery categories">
          <button
            role="tab"
            aria-selected={selectedCategory === 'all'}
            onClick={() => setSelectedCategory('all')}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              selectedCategory === 'all'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-glam-pink-50 text-glam-pink-700 hover:bg-glam-pink-100'
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-glam-pink-50 text-glam-pink-700 hover:bg-glam-pink-100'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className={cn('grid gap-4', gridCols[columns])} role="list">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            className="group relative overflow-hidden rounded-xl cursor-pointer"
            role="listitem"
            onClick={() => setExpandedImage(item.mediaUrl)}
          >
            <div className="aspect-[4/5] overflow-hidden">
              {loadingImages.has(item.mediaUrl) ? (
                <div className="w-full h-full bg-glam-pink-50 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
              ) : (
                <Image
                  src={item.mediaUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  onLoad={() => handleImageLoad(item.mediaUrl)}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div className="w-full text-white">
                <h4 className="font-heading font-semibold text-lg">{item.title}</h4>
                {item.category && (
                  <span className="text-sm opacity-80">{item.category}</span>
                )}
              </div>
            </div>
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => { e.stopPropagation(); setExpandedImage(item.mediaUrl); }}
                className="p-2 rounded-full bg-white/90 backdrop-blur text-foreground hover:bg-white"
                aria-label={`View ${item.title} full size`}
              >
                <Expand className="h-5 w-5" />
              </button>
            </div>
            {item.mediaType === 'VIDEO' && (
              <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-red-500 text-white text-xs font-medium">
                Video
              </div>
            )}
            {item.mediaType === 'BEFORE_AFTER' && (
              <div className="absolute bottom-3 left-3 px-2 py-1 rounded-full bg-glam-gold-500 text-white text-xs font-medium">
                Before/After
              </div>
            )}
          </article>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No images found for this category.</p>
          </div>
        )}
      </div>

      {expandedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={() => setExpandedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Full size image"
        >
          <button
            onClick={() => setExpandedImage(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <Image
            src={expandedImage}
            alt="Expanded view"
            className="max-h-[90vh] max-w-[90vw] object-contain"
            priority
          />
        </div>
      )}
    </div>
  )
}