import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Shirt, CloudSun, Wand2 } from 'lucide-react'

const features = [
  {
    icon: Shirt,
    title: 'Virtual Wardrobe',
    description: 'Upload and organize all your clothing in one beautiful digital closet.',
  },
  {
    icon: Wand2,
    title: 'AI Outfit Generator',
    description: 'Get personalized outfit recommendations powered by advanced AI.',
  },
  {
    icon: CloudSun,
    title: 'Weather-Smart Styling',
    description: "Outfits tailored to today's weather, always appropriate.",
  },
  {
    icon: Sparkles,
    title: 'Style Intelligence',
    description: 'Discover what your wardrobe is missing and elevate your personal style.',
  },
]

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <section className="flex max-w-4xl flex-col items-center gap-6 text-center">
        <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-sm">
          <Sparkles className="h-3.5 w-3.5" />
          AI-Powered Fashion
        </Badge>

        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Your personal{' '}
          <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
            AI stylist
          </span>
        </h1>

        <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Upload your wardrobe, and let AI craft the perfect outfit for every occasion, weather, and
          mood. Style intelligence, finally democratized.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" className="gap-2 px-8" asChild>
            <Link href="/dashboard">
              <Sparkles className="h-4 w-4" />
              Get Started Free
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="px-8">
            See How It Works
          </Button>
        </div>
      </section>

      <section className="mt-24 grid max-w-4xl gap-4 sm:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border bg-card p-6 transition-shadow hover:shadow-md"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400">
              <feature.icon className="h-5 w-5" />
            </div>
            <h3 className="mb-1.5 font-semibold">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
