import { Metadata } from 'next'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { Shirt, Wand2, Sparkles, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { WeatherWidget } from '@/components/weather/weather-widget'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Dashboard' }

async function getStats(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: {
      _count: { select: { clothingItems: true, outfits: true } },
    },
  })
  return { items: user?._count.clothingItems ?? 0, outfits: user?._count.outfits ?? 0 }
}

export default async function DashboardPage() {
  const { userId } = await auth()
  if (!userId) return null

  const stats = await getStats(userId)

  const statCards = [
    { label: 'Wardrobe Items', value: stats.items, icon: Shirt, sub: stats.items === 0 ? 'Add your first item' : 'items in closet' },
    { label: 'Saved Outfits', value: stats.outfits, icon: Wand2, sub: stats.outfits === 0 ? 'Generate an outfit' : 'outfits saved' },
    { label: 'AI Suggestions', value: '∞', icon: Sparkles, sub: 'Powered by Groq AI' },
    { label: 'Style Score', value: stats.items > 5 ? '85' : '—', icon: TrendingUp, sub: stats.items > 5 ? 'Great wardrobe!' : 'Add more items' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Good morning 👋</h1>
        <p className="mt-1 text-muted-foreground">Here&apos;s what&apos;s happening with your wardrobe today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400">
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-1">
          <WeatherWidget />
        </div>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start gap-2" variant="outline" asChild>
              <Link href="/wardrobe"><Shirt className="h-4 w-4" />Upload clothing item</Link>
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline" asChild>
              <Link href="/outfits"><Wand2 className="h-4 w-4" />Generate outfit</Link>
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline" asChild>
              <Link href="/stylist"><Sparkles className="h-4 w-4" />Ask AI stylist</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Getting Started</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { step: '1', label: 'Upload your first clothing item', done: stats.items > 0 },
              { step: '2', label: 'Complete your style profile', done: false },
              { step: '3', label: 'Generate your first outfit', done: stats.outfits > 0 },
              { step: '4', label: 'Get AI wardrobe analysis', done: false },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-3">
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${item.done ? 'bg-violet-600 text-white' : 'bg-muted text-muted-foreground'}`}>
                  {item.done ? '✓' : item.step}
                </div>
                <p className={`text-sm ${item.done ? 'line-through text-muted-foreground' : ''}`}>{item.label}</p>
                <Badge variant={item.done ? 'default' : 'secondary'} className="ml-auto text-xs">
                  {item.done ? 'Done' : 'Pending'}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
