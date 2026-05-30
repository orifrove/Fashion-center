import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { clothingItems: { orderBy: { createdAt: 'desc' } } },
  })

  if (!user) {
    return NextResponse.json({ items: [] })
  }

  return NextResponse.json({ items: user.clothingItems })
}

export async function POST(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { name, category, colors, season, style, imageUrl, tags } = body

  let user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) {
    user = await prisma.user.create({
      data: { clerkId: userId, email: body.email ?? `${userId}@styleai.app` },
    })
  }

  const item = await prisma.clothingItem.create({
    data: {
      userId: user.id,
      name,
      category,
      colors: colors ?? [],
      season: season ?? [],
      style: style ?? [],
      imageUrl,
      tags: tags ?? [],
    },
  })

  return NextResponse.json({ item })
}
