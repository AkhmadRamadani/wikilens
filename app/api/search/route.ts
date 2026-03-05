import { NextRequest, NextResponse } from 'next/server'
import { getSummary, openSearch } from '@/lib/wiki'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')
  const lang = request.nextUrl.searchParams.get('lang') || undefined
  if (!query) {
    return NextResponse.json({ error: 'Missing query' }, { status: 400 })
  }

  try {
    const summary = await getSummary(query, lang)
    return NextResponse.json(summary)
  } catch {
    // Try opensearch fallback
    try {
      const suggestions = await openSearch(query, lang)
      if (suggestions.length > 0) {
        const summary = await getSummary(suggestions[0], lang)
        return NextResponse.json(summary)
      }
    } catch {
      // Swallow
    }
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }
}
