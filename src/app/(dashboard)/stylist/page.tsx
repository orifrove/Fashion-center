import { Metadata } from 'next'
import { Sparkles } from 'lucide-react'

export const metadata: Metadata = { title: 'AI Stylist' }

export default function StylistPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
        <Sparkles className="h-8 w-8" />
      </div>
      <h1 className="text-2xl font-bold">AI Stylist</h1>
      <p className="max-w-sm text-muted-foreground">
        Your personal AI fashion advisor. Get recommendations, wardrobe analysis, and style tips.
      </p>
    </div>
  )
}
