'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { SearchSuggestion } from '@/lib/types'
import { useLanguage } from '@/lib/LanguageContext'

interface SearchBarProps {
  initialValue?: string
  autoFocus?: boolean
}

export default function SearchBar({ initialValue = '', autoFocus = false }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue)
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const router = useRouter()
  const { language } = useLanguage()
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.length < 2) { setSuggestions([]); return }
    try {
      const res = await fetch(`/api/suggest?q=${encodeURIComponent(q)}&lang=${language}`)
      const data = await res.json()
      setSuggestions(data.slice(0, 6))
      setShowSuggestions(true)
    } catch {}
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)
    setActiveIdx(-1)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 300)
  }

  const doSearch = (title: string) => {
    if (!title.trim()) return
    setShowSuggestions(false)
    router.push(`/article/${encodeURIComponent(title.trim())}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx(i => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx(i => Math.max(i - 1, -1))
    } else if (e.key === 'Enter') {
      if (activeIdx >= 0 && suggestions[activeIdx]) {
        doSearch(suggestions[activeIdx].title)
      } else {
        doSearch(query)
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  return (
    <div className="relative max-w-[680px]">
      <div
        className={`flex items-center bg-[var(--surface)] border rounded-2xl overflow-visible transition-all duration-300 ${
          showSuggestions && suggestions.length > 0
            ? 'border-[rgba(232,201,122,0.4)] shadow-[0_0_0_4px_var(--glow),0_20px_40px_rgba(0,0,0,0.4)] rounded-b-none'
            : 'border-white/[0.07] hover:border-white/[0.12] focus-within:border-[rgba(232,201,122,0.4)] focus-within:shadow-[0_0_0_4px_var(--glow),0_20px_40px_rgba(0,0,0,0.4)]'
        }`}
      >
        <span className="px-5 text-[var(--text-muted)] text-lg flex-shrink-0 select-none">⌕</span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          placeholder="Search for anything… black holes, Renaissance art, Tokyo…"
          className="flex-1 bg-transparent border-none outline-none py-5 text-base text-[var(--text)] placeholder:text-[var(--text-muted)] font-sans"
        />
        <button
          onClick={() => doSearch(query)}
          disabled={loading}
          className="m-2 px-6 py-3 bg-[var(--accent)] text-[#0a0a0f] border-none rounded-[10px] font-sans text-sm font-semibold cursor-pointer transition-all hover:opacity-90 hover:scale-[0.98] disabled:opacity-50 whitespace-nowrap"
        >
          {loading ? 'Searching…' : 'Search'}
        </button>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-[var(--surface)] border border-t-0 border-[rgba(232,201,122,0.4)] rounded-b-2xl overflow-hidden z-50 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
          {suggestions.map((s, i) => (
            <button
              key={s.title}
              onMouseDown={() => doSearch(s.title)}
              className={`w-full text-left px-5 py-3 border-none cursor-pointer transition-colors flex flex-col gap-0.5 ${
                i === activeIdx
                  ? 'bg-[var(--surface2)]'
                  : 'bg-transparent hover:bg-[var(--surface2)]'
              }`}
            >
              <span className="text-[13px] text-[var(--text)]">{s.title}</span>
              {s.description && (
                <span className="text-[11px] text-[var(--text-muted)] line-clamp-1">{s.description}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
