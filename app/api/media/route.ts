import { NextRequest, NextResponse } from 'next/server'
import { getMediaList } from '@/lib/wiki'

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get('title')
  if (!title) return NextResponse.json({ error: 'Missing title' }, { status: 400 })
  try {
    const data = await getMediaList(title)
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 })
  }
}
