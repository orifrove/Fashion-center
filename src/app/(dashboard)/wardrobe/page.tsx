import { Metadata } from 'next'
import { Shirt } from 'lucide-react'

export const metadata: Metadata = { title: 'Wardrobe' }

export default function WardrobePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
        <Shirt className="h-8 w-8" />
      </div>
      <h1 className="text-2xl font-bold">Your Wardrobe</h1>
      <p className="max-w-sm text-muted-foreground">
        Your virtual closet is empty. Start adding your clothing items to get AI-powered outfit recommendations.
      </p>
    </div>
  )
}
