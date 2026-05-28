import { Metadata } from 'next'
import { User } from 'lucide-react'

export const metadata: Metadata = { title: 'Profile' }

export default function ProfilePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
        <User className="h-8 w-8" />
      </div>
      <h1 className="text-2xl font-bold">Style Profile</h1>
      <p className="max-w-sm text-muted-foreground">
        Tell us about your body type, skin tone, and style preferences for personalized recommendations.
      </p>
    </div>
  )
}
