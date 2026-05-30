'use client'

import { useState, useEffect } from 'react'
import { Loader2, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

const BODY_TYPES = ['hourglass', 'pear', 'apple', 'rectangle', 'inverted-triangle']
const SKIN_TONES = ['fair', 'light', 'medium', 'olive', 'tan', 'deep']
const STYLES = ['casual', 'formal', 'business', 'sporty', 'bohemian', 'minimalist', 'streetwear', 'elegant']
const COLORS = ['black', 'white', 'navy', 'grey', 'beige', 'brown', 'red', 'blue', 'green', 'yellow', 'pink', 'purple']

export function ProfileForm() {
  const [bodyType, setBodyType] = useState('')
  const [skinTone, setSkinTone] = useState('')
  const [favoriteStyles, setFavoriteStyles] = useState<string[]>([])
  const [preferredColors, setPreferredColors] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/profile')
      .then((r) => r.json())
      .then((data) => {
        if (data.profile) {
          setBodyType(data.profile.bodyType ?? '')
          setSkinTone(data.profile.skinTone ?? '')
          setFavoriteStyles(data.profile.favoriteStyles ?? [])
          setPreferredColors(data.profile.preferredColors ?? [])
        }
      })
      .finally(() => setLoading(false))
  }, [])

  function toggleItem(list: string[], setList: (v: string[]) => void, item: string) {
    setList(list.includes(item) ? list.filter((x) => x !== item) : [...list, item])
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bodyType, skinTone, favoriteStyles, preferredColors }),
      })
      if (!res.ok) throw new Error('Failed to save')
      toast.success('Profile saved!')
    } catch {
      toast.error('Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Body Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {BODY_TYPES.map((b) => (
              <button
                key={b}
                onClick={() => setBodyType(b)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                  bodyType === b ? 'bg-violet-600 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {b.replace('-', ' ')}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Skin Tone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {SKIN_TONES.map((s) => (
              <button
                key={s}
                onClick={() => setSkinTone(s)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                  skinTone === s ? 'bg-violet-600 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Favorite Styles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {STYLES.map((s) => (
              <button
                key={s}
                onClick={() => toggleItem(favoriteStyles, setFavoriteStyles, s)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                  favoriteStyles.includes(s) ? 'bg-violet-600 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Preferred Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => toggleItem(preferredColors, setPreferredColors, c)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                  preferredColors.includes(c) ? 'bg-violet-600 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving} className="gap-2">
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Save Profile
      </Button>
    </div>
  )
}
