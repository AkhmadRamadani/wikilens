import { NextRequest, NextResponse } from 'next/server'
import { getRevision } from '@/lib/wiki'

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get('title')
  if (!title) return NextResponse.json({ error: 'Missing title' }, { status: 400 })
  try {
    const data = await getRevision(title)
    return NextResponse.json(data)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch revision' }, { status: 500 })
  }
}
