import { Metadata } from 'next'
import { Shirt, Wand2, Sparkles, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Dashboard',
}

const stats = [
  { label: 'Wardrobe Items', value: '0', icon: Shirt, change: 'Add your first item' },
  { label: 'Saved Outfits', value: '0', icon: Wand2, change: 'Generate an outfit' },
  { label: 'AI Suggestions', value: '0', icon: Sparkles, change: 'Talk to AI stylist' },
  { label: 'Style Score', value: '—', icon: TrendingUp, change: 'Complete your profile' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Good morning 👋</h1>
        <p className="mt-1 text-muted-foreground">
          Here&apos;s what&apos;s happening with your wardrobe today.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400">
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start gap-2" variant="outline">
              <Shirt className="h-4 w-4" />
              Upload clothing item
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline">
              <Wand2 className="h-4 w-4" />
              Generate outfit
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline">
              <Sparkles className="h-4 w-4" />
              Ask AI stylist
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Getting Started</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { step: '1', label: 'Upload your first clothing item', done: false },
              { step: '2', label: 'Complete your style profile', done: false },
              { step: '3', label: 'Generate your first outfit', done: false },
              { step: '4', label: 'Get AI wardrobe analysis', done: false },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  {item.step}
                </div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <Badge variant="secondary" className="ml-auto text-xs">
                  Pending
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
