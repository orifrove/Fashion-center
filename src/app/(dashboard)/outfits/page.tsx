import { Metadata } from 'next'
import { Wand2 } from 'lucide-react'

export const metadata: Metadata = { title: 'Outfits' }

export default function OutfitsPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
        <Wand2 className="h-8 w-8" />
      </div>
      <h1 className="text-2xl font-bold">AI Outfit Generator</h1>
      <p className="max-w-sm text-muted-foreground">
        Add items to your wardrobe first, then let AI create perfect outfits for any occasion.
      </p>
    </div>
  )
}
