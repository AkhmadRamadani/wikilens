import type { WikiSummary, WikiRevision, WikiMediaList, SearchSuggestion } from './types'

function getBase(lang?: string): string {
  const domain = lang ? lang.split('-')[0] : 'en'
  return `https://${domain}.wikipedia.org/api/rest_v1`
}

function getMwApi(lang?: string): string {
  const domain = lang ? lang.split('-')[0] : 'en'
  return `https://${domain}.wikipedia.org/w/api.php`
}

async function wikiGet<T>(path: string, lang?: string): Promise<T> {
  const headers: Record<string, string> = { 'Api-User-Agent': 'WikiLens/1.0 (https://github.com/wikilens)' }
  if (lang) {
    headers['Accept-Language'] = lang
  }

  const res = await fetch(`${getBase(lang)}${path}`, {
    headers,
    next: { revalidate: 300 }, // Cache for 5 minutes
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json() as Promise<T>
}

export async function getSummary(title: string, lang?: string): Promise<WikiSummary> {
  return wikiGet<WikiSummary>(`/page/summary/${encodeURIComponent(title)}`, lang)
}

export async function getRevision(title: string, lang?: string): Promise<WikiRevision> {
  return wikiGet<WikiRevision>(`/page/title/${encodeURIComponent(title)}`, lang)
}

export async function getMediaList(title: string, lang?: string): Promise<WikiMediaList> {
  return wikiGet<WikiMediaList>(`/page/media-list/${encodeURIComponent(title)}`, lang)
}

export async function getRandomSummary(lang?: string): Promise<WikiSummary> {
  return wikiGet<WikiSummary>('/page/random/summary', lang)
}

export async function searchSuggestions(query: string, lang?: string): Promise<SearchSuggestion[]> {
  const params = new URLSearchParams({
    action: 'query',
    list: 'search',
    srsearch: query,
    srlimit: '8',
    srprop: 'snippet|titlesnippet',
    format: 'json',
    origin: '*',
  })
  const res = await fetch(`${getMwApi(lang)}?${params}`)
  const data = await res.json()
  return (data.query?.search || []).map((r: { title: string; snippet: string }) => ({
    title: r.title,
    description: r.snippet?.replace(/<[^>]+>/g, '').substring(0, 80),
  }))
}

export async function openSearch(query: string, lang?: string): Promise<string[]> {
  const params = new URLSearchParams({
    action: 'opensearch',
    search: query,
    limit: '5',
    format: 'json',
    origin: '*',
  })
  const res = await fetch(`${getMwApi(lang)}?${params}`)
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

  const res = await fetch(`${getBase(language)}/page/mobile-html/${encodeURIComponent(title)}`, {
    headers,
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.text()
}
