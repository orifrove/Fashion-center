'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles, Shirt, Wand2, User, LayoutDashboard, CloudSun } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Wardrobe', href: '/wardrobe', icon: Shirt },
  { name: 'Outfits', href: '/outfits', icon: Wand2 },
  { name: 'AI Stylist', href: '/stylist', icon: CloudSun },
  { name: 'Profile', href: '/profile', icon: User },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <span className="text-lg font-semibold tracking-tight">StyleAI</span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-4">
        <div className="rounded-xl bg-violet-50 p-4 dark:bg-violet-950/50">
          <p className="text-xs font-medium text-violet-700 dark:text-violet-300">
            AI Credits
          </p>
          <p className="mt-1 text-2xl font-bold text-violet-700 dark:text-violet-300">48</p>
          <p className="mt-0.5 text-xs text-violet-600/70 dark:text-violet-400/70">
            of 50 remaining
          </p>
          <div className="mt-2 h-1.5 rounded-full bg-violet-200 dark:bg-violet-800">
            <div className="h-1.5 w-[96%] rounded-full bg-violet-600" />
          </div>
        </div>
      </div>
    </aside>
  )
}
