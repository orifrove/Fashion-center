'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Sparkles, LayoutDashboard, Shirt, Wand2, CloudSun, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Wardrobe', href: '/wardrobe', icon: Shirt },
  { name: 'Outfits', href: '/outfits', icon: Wand2 },
  { name: 'AI Stylist', href: '/stylist', icon: CloudSun },
  { name: 'Profile', href: '/profile', icon: User },
]

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight">StyleAI</span>
        </div>
        <nav className="space-y-1 p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
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
      </SheetContent>
    </Sheet>
  )
}
