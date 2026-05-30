import { Metadata } from 'next'
import { ProfileForm } from '@/components/profile/profile-form'

export const metadata: Metadata = { title: 'Profile' }

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Style Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Tell us about yourself for personalized AI recommendations
        </p>
      </div>
      <ProfileForm />
    </div>
  )
}
