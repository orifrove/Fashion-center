'use client'

import Image from 'next/image'
import { Heart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface ClothingCardProps {
  id: string
  name: string
  category: string
  imageUrl: string
  season: string[]
  isFavorite: boolean
}

export function ClothingCard({ name, category, imageUrl, season, isFavorite }: ClothingCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <button className="absolute right-2 top-2 rounded-full bg-white/80 p-1.5 opacity-0 transition-opacity group-hover:opacity-100 dark:bg-black/50">
          <Heart className={`h-3.5 w-3.5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
        </button>
      </div>
      <div className="p-3">
        <p className="truncate text-sm font-medium">{name}</p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          <Badge variant="secondary" className="text-xs capitalize">{category}</Badge>
          {season.slice(0, 1).map((s) => (
            <Badge key={s} variant="outline" className="text-xs capitalize">{s}</Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
