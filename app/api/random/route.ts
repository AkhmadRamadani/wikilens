import { NextRequest, NextResponse } from 'next/server'
import { getRandomSummary } from '@/lib/wiki'

export async function GET(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get('lang') || undefined
  try {
    const data = await getRandomSummary(lang)
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch random article' }, { status: 500 })
  }
}
