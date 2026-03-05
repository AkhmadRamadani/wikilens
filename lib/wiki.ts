import type { WikiSummary, WikiRevision, WikiMediaList, SearchSuggestion } from './types'

const BASE = 'https://en.wikipedia.org/api/rest_v1'
const MW_API = 'https://en.wikipedia.org/w/api.php'

async function wikiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Api-User-Agent': 'WikiLens/1.0 (https://github.com/wikilens)' },
    next: { revalidate: 300 }, // Cache for 5 minutes
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json() as Promise<T>
}

export async function getSummary(title: string): Promise<WikiSummary> {
  return wikiGet<WikiSummary>(`/page/summary/${encodeURIComponent(title)}`)
}

export async function getRevision(title: string): Promise<WikiRevision> {
  return wikiGet<WikiRevision>(`/page/title/${encodeURIComponent(title)}`)
}

export async function getMediaList(title: string): Promise<WikiMediaList> {
  return wikiGet<WikiMediaList>(`/page/media-list/${encodeURIComponent(title)}`)
}

export async function getRandomSummary(): Promise<WikiSummary> {
  return wikiGet<WikiSummary>('/page/random/summary')
}

export async function searchSuggestions(query: string): Promise<SearchSuggestion[]> {
  const params = new URLSearchParams({
    action: 'query',
    list: 'search',
    srsearch: query,
    srlimit: '8',
    srprop: 'snippet|titlesnippet',
    format: 'json',
    origin: '*',
  })
  const res = await fetch(`${MW_API}?${params}`)
  const data = await res.json()
  return (data.query?.search || []).map((r: { title: string; snippet: string }) => ({
    title: r.title,
    description: r.snippet?.replace(/<[^>]+>/g, '').substring(0, 80),
  }))
}

export async function openSearch(query: string): Promise<string[]> {
  const params = new URLSearchParams({
    action: 'opensearch',
    search: query,
    limit: '5',
    format: 'json',
    origin: '*',
  })
  const res = await fetch(`${MW_API}?${params}`)
  const data = await res.json()
  return data[1] || []
}

export async function getMobileHtml(title: string, language?: string): Promise<string> {
  const headers: Record<string, string> = {
    'User-Agent': 'WikiLens/1.0 (https://github.com/wikilens)',
    'Api-User-Agent': 'WikiLens/1.0 (https://github.com/wikilens)'
  }
  if (language) {
    headers['Accept-Language'] = language
  }

  const res = await fetch(`${BASE}/page/mobile-html/${encodeURIComponent(title)}`, {
    headers,
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.text()
}
