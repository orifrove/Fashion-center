'use client'

import { useState } from 'react'
import { Wand2, Loader2, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

interface OutfitSuggestion {
  name: string
  items: string[]
  reason: string
  occasion: string
  styleScore: number
}

const OCCASIONS = ['casual', 'work', 'date', 'party', 'sport', 'formal']

export function OutfitGenerator() {
  const [occasion, setOccasion] = useState('casual')
  const [outfits, setOutfits] = useState<OutfitSuggestion[]>([])
  const [loading, setLoading] = useState(false)

  async function generateOutfits() {
    setLoading(true)
    try {
      const res = await fetch('/api/ai/outfit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ occasion }),
      })
      const data = await res.json()
      if (data.error) return toast.error(data.error)
      setOutfits(data.outfits ?? [])
      if (data.outfits?.length === 0) toast.info('Add more items to your wardrobe for better results')
    } catch {
      toast.error('Failed to generate outfits')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Occasion</p>
            <div className="flex flex-wrap gap-2">
              {OCCASIONS.map((o) => (
                <button
                  key={o}
                  onClick={() => setOccasion(o)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                    occasion === o
                      ? 'bg-violet-600 text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
          <Button onClick={generateOutfits} disabled={loading} className="w-full gap-2">
            {loading ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Generating...</>
            ) : (
              <><Wand2 className="h-4 w-4" /> Generate Outfits</>
            )}
          </Button>
        </CardContent>
      </Card>

      {outfits.length > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          {outfits.map((outfit, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{outfit.name}</CardTitle>
                  <div className="flex items-center gap-1 text-sm font-medium text-violet-600">
                    <Star className="h-3.5 w-3.5 fill-violet-600" />
                    {outfit.styleScore}
                  </div>
                </div>
                <Badge variant="secondary" className="w-fit capitalize">{outfit.occasion}</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{outfit.reason}</p>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Items ({outfit.items.length})</p>
                  <div className="flex flex-wrap gap-1">
                    {outfit.items.map((item, j) => (
                      <Badge key={j} variant="outline" className="text-xs">{item}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {outfits.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed py-16 text-center">
          <Wand2 className="h-10 w-10 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">Select an occasion and generate your first outfit</p>
        </div>
      )}
    </div>
  )
}
