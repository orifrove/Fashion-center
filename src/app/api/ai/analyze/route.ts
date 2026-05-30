import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { groq, GROQ_MODEL } from '@/lib/groq'

export async function POST(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name, category } = await request.json()

  const completion = await groq.chat.completions.create({
    model: GROQ_MODEL,
    messages: [
      {
        role: 'system',
        content: `You are a fashion expert AI. Analyze clothing items and return JSON only.`,
      },
      {
        role: 'user',
        content: `Analyze this clothing item and return JSON with these fields:
- colors: string[] (main colors, e.g. ["white", "blue"])
- style: string[] (from: casual, formal, business, sporty, bohemian, minimalist, streetwear, elegant)
- season: string[] (from: spring, summer, autumn, winter, all)
- tags: string[] (descriptive tags)

Item name: "${name}"
Category: "${category}"

Return ONLY valid JSON, no explanation.`,
      },
    ],
    temperature: 0.3,
    max_tokens: 200,
  })

  const content = completion.choices[0]?.message?.content ?? '{}'

  try {
    const cleaned = content.replace(/```json|```/g, '').trim()
    const analysis = JSON.parse(cleaned)
    return NextResponse.json(analysis)
  } catch {
    return NextResponse.json({ colors: [], style: ['casual'], season: ['all'], tags: [] })
  }
}
