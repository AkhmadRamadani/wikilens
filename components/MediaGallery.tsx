'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { WikiMediaItem } from '@/lib/types'

interface MediaGalleryProps {
  title: string
}

export default function MediaGallery({ title }: MediaGalleryProps) {
  const [images, setImages] = useState<WikiMediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setImages([])
    fetch(`/api/media?title=${encodeURIComponent(title)}`)
      .then(r => r.json())
      .then(data => {
        const imgs = (data.items || [])
          .filter((i: WikiMediaItem) => i.type === 'image' && i.thumbnail?.source)
          .slice(0, 6)
        setImages(imgs)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [title])

  if (loading) {
    return (
      <div className="mt-5">
        <div className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--text-dim)] mb-3">Media</div>
        <div className="grid grid-cols-2 gap-2">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="aspect-square rounded-[10px] shimmer-bg" />
          ))}
        </div>
      </div>
    )
  }

  if (images.length === 0) return null

  return (
    <>
      <div className="mt-5">
        <div className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--text-dim)] mb-3">
          Media · {images.length} item{images.length !== 1 ? 's' : ''}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setLightbox(img.thumbnail!.source)}
              className="aspect-square rounded-[10px] overflow-hidden border border-white/[0.07] cursor-pointer transition-all hover:opacity-80 hover:scale-[0.97] relative bg-[var(--surface2)]"
            >
              <Image
                src={img.thumbnail!.source}
                alt={img.caption?.text || 'Image'}
                fill
                className="object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-3xl max-h-[80vh] w-full">
            <img
              src={lightbox}
              alt="Full size"
              className="w-full h-full object-contain rounded-xl"
              onClick={e => e.stopPropagation()}
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 w-8 h-8 bg-black/60 text-white border-none rounded-full cursor-pointer text-sm flex items-center justify-center hover:bg-black/80"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  )
}
