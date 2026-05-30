import { Metadata } from 'next'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ClothingCard } from '@/components/wardrobe/clothing-card'
import { UploadForm } from '@/components/wardrobe/upload-form'

export const metadata: Metadata = { title: 'Wardrobe' }

async function getWardrobeItems(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: { clothingItems: { orderBy: { createdAt: 'desc' } } },
  })
  return user?.clothingItems ?? []
}

export default async function WardrobePage() {
  const { userId } = await auth()
  if (!userId) return null

  const items = await getWardrobeItems(userId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Wardrobe</h1>
          <p className="mt-1 text-sm text-muted-foreground">{items.length} items</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add clothing item</DialogTitle>
            </DialogHeader>
            <UploadForm />
          </DialogContent>
        </Dialog>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed py-24 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
            <Plus className="h-8 w-8" />
          </div>
          <div>
            <p className="font-medium">Your wardrobe is empty</p>
            <p className="mt-1 text-sm text-muted-foreground">Add your first clothing item to get started</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {items.map((item) => (
            <ClothingCard
              key={item.id}
              id={item.id}
              name={item.name}
              category={item.category}
              imageUrl={item.imageUrl}
              season={item.season}
              isFavorite={item.isFavorite}
            />
          ))}
        </div>
      )}
    </div>
  )
}
