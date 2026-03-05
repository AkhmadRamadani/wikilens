import { NextRequest, NextResponse } from 'next/server'
import { getMobileHtml } from '@/lib/wiki'

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get('title')
  const lang = request.nextUrl.searchParams.get('lang')

  if (!title) return NextResponse.json({ error: 'Missing title' }, { status: 400 })
  try {
    const data = await getMobileHtml(title, lang || undefined)
    return new NextResponse(data, {
      headers: {
        'Content-Type': 'text/html',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch article content' }, { status: 500 })
  }
}
