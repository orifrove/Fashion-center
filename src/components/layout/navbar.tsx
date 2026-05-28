'use client'

import { MobileNav } from './mobile-nav'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-violet-100 text-xs font-medium text-violet-700">
            SA
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
