import { Metadata } from 'next'
import { StylistChat } from '@/components/stylist/stylist-chat'

export const metadata: Metadata = { title: 'AI Stylist' }

export default function StylistPage() {
  return (
    <div className="flex h-full flex-col space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Stylist</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your personal fashion advisor powered by AI
        </p>
      </div>
      <StylistChat />
    </div>
  )
}
