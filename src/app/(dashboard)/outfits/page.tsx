import { Metadata } from 'next'
import { OutfitGenerator } from '@/components/outfits/outfit-generator'

export const metadata: Metadata = { title: 'Outfits' }

export default function OutfitsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Outfit Generator</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Let AI create perfect outfits from your wardrobe
        </p>
      </div>
      <OutfitGenerator />
    </div>
  )
}
