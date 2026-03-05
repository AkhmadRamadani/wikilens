import { NextRequest, NextResponse } from 'next/server'
import { searchSuggestions } from '@/lib/wiki'

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')
  const lang = request.nextUrl.searchParams.get('lang') || undefined
  if (!q || q.length < 2) return NextResponse.json([])
  try {
    const suggestions = await searchSuggestions(q, lang)
    return NextResponse.json(suggestions)
  } catch {
    return NextResponse.json([])
  }
}
