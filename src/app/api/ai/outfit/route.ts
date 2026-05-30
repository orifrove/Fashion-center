import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { groq, GROQ_MODEL } from '@/lib/groq'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { occasion, weather } = await request.json()

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { clothingItems: true },
  })

  if (!user || user.clothingItems.length === 0) {
    return NextResponse.json({ error: 'No clothes in wardrobe' }, { status: 400 })
  }

  const wardrobeList = user.clothingItems.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    colors: item.colors,
    style: item.style,
    season: item.season,
  }))

  const completion = await groq.chat.completions.create({
    model: GROQ_MODEL,
    messages: [
      {
        role: 'system',
        content: 'You are an expert fashion stylist AI. Create outfit recommendations from available wardrobe items. Return JSON only.',
      },
      {
        role: 'user',
        content: `Create 3 outfit recommendations from this wardrobe.

Occasion: ${occasion ?? 'casual everyday'}
Weather: ${weather ?? 'mild'}

Wardrobe items:
${JSON.stringify(wardrobeList, null, 2)}

Return JSON array with this structure:
[{
  "name": "outfit name",
  "items": ["item_id1", "item_id2"],
  "reason": "why this works",
  "occasion": "best occasion for this",
  "styleScore": 85
}]

Return ONLY valid JSON array, no explanation.`,
      },
    ],
    temperature: 0.7,
    max_tokens: 800,
  })

  const content = completion.choices[0]?.message?.content ?? '[]'

  try {
    const cleaned = content.replace(/```json|```/g, '').trim()
    const outfits = JSON.parse(cleaned)
    return NextResponse.json({ outfits })
  } catch {
    return NextResponse.json({ outfits: [] })
  }
}
