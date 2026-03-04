export interface WikiSummary {
  type: string
  title: string
  displaytitle?: string
  titles: {
    canonical: string
    normalized: string
    display: string
  }
  pageid: number
  extract: string
  extract_html?: string
  thumbnail?: {
    source: string
    width: number
    height: number
  }
  originalimage?: {
    source: string
    width: number
    height: number
  }
  lang: string
  dir: string
  timestamp?: string
  description?: string
  coordinates?: {
    lat: number
    lon: number
  }
}

export interface WikiRevisionItem {
  title: string
  page_id: number
  rev: number
  tid: string
  comment: string
  user_id?: number
  user_text?: string
  timestamp: string
  redirect: boolean
  page_language: string
  tags?: string[]
}

export interface WikiRevision {
  count: number
  items: WikiRevisionItem[]
}

export interface WikiMediaItem {
  title: string
  type: 'image' | 'video' | 'audio'
  section_id: number
  showInGallery: boolean
  thumbnail?: {
    source: string
    width: number
    height: number
  }
  caption?: {
    html: string
    text: string
  }
}

export interface WikiMediaList {
  revision: string
  tid: string
  items: WikiMediaItem[]
}

export interface SearchSuggestion {
  title: string
  description?: string
  thumbnail?: { source: string }
}
