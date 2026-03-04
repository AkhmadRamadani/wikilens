import { NextResponse } from 'next/server'
import { getRandomSummary } from '@/lib/wiki'

export async function GET() {
  try {
    const data = await getRandomSummary()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch random article' }, { status: 500 })
  }
}
