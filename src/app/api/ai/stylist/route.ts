import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { groq, GROQ_MODEL } from '@/lib/groq'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { message, history } = await request.json()

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { clothingItems: true, profile: true },
  })

  const wardrobeSummary = user?.clothingItems
    ? `User has ${user.clothingItems.length} items: ${user.clothingItems.map((i) => `${i.name} (${i.category})`).join(', ')}`
    : 'Empty wardrobe'

  const messages = [
    {
      role: 'system' as const,
      content: `You are StyleAI, an expert personal fashion stylist. Be friendly, concise, and give actionable advice.

User's wardrobe: ${wardrobeSummary}
Body type: ${user?.profile?.bodyType ?? 'unknown'}
Skin tone: ${user?.profile?.skinTone ?? 'unknown'}
Favorite styles: ${user?.profile?.favoriteStyles?.join(', ') ?? 'not set'}`,
    },
    ...(history ?? []),
    { role: 'user' as const, content: message },
  ]

  const completion = await groq.chat.completions.create({
    model: GROQ_MODEL,
    messages,
    temperature: 0.7,
    max_tokens: 500,
  })

  const reply = completion.choices[0]?.message?.content ?? 'Sorry, I could not process your request.'

  return NextResponse.json({ reply })
}
