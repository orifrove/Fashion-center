import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { profile: true },
  })

  return NextResponse.json({ profile: user?.profile ?? null })
}

export async function POST(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { bodyType, skinTone, favoriteStyles, preferredColors } = body

  let user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) {
    user = await prisma.user.create({
      data: { clerkId: userId, email: `${userId}@styleai.app` },
    })
  }

  const profile = await prisma.userProfile.upsert({
    where: { userId: user.id },
    update: { bodyType, skinTone, favoriteStyles, preferredColors },
    create: { userId: user.id, bodyType, skinTone, favoriteStyles: favoriteStyles ?? [], preferredColors: preferredColors ?? [] },
  })

  return NextResponse.json({ profile })
}
