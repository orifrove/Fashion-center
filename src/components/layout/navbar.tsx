'use client'

import { UserButton } from '@clerk/nextjs'
import { MobileNav } from './mobile-nav'
import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'

export function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6">
      <MobileNav />
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        <UserButton />
      </div>
    </header>
  )
}
