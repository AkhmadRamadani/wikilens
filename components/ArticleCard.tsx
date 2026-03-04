'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { WikiSummary, WikiRevisionItem } from '@/lib/types'

interface ArticleCardProps {
  article: WikiSummary
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const [revision, setRevision] = useState<WikiRevisionItem | null>(null)
  const [revLoading, setRevLoading] = useState(false)
  const [revError, setRevError] = useState(false)
  const [showRev, setShowRev] = useState(false)

  const [fullHtml, setFullHtml] = useState<string | null>(null)
  const [htmlLoading, setHtmlLoading] = useState(false)
  const [htmlError, setHtmlError] = useState(false)

  const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(article.titles?.canonical || article.title)}`

  const fetchFullHtml = async () => {
    if (fullHtml) return // already loaded
    setHtmlLoading(true)
    setHtmlError(false)
    try {
      const res = await fetch(`/api/article?title=${encodeURIComponent(article.titles?.canonical || article.title)}`)
      if (!res.ok) throw new Error('Failed to load')
      const text = await res.text()
      setFullHtml(text)
    } catch {
      setHtmlError(true)
    } finally {
      setHtmlLoading(false)
    }
  }

  const fetchRevision = async () => {
    if (showRev) { setShowRev(false); return }
    setRevLoading(true)
    setRevError(false)
    try {
      const res = await fetch(`/api/revision?title=${encodeURIComponent(article.titles?.canonical || article.title)}`)
      const data = await res.json()
      setRevision(data.items?.[0] || null)
      setShowRev(true)
    } catch {
      setRevError(true)
    } finally {
      setRevLoading(false)
    }
  }

  return (
    <div className="bg-[var(--surface)] border border-white/[0.07] rounded-[20px] overflow-hidden animate-fade-up">
      {/* Hero image */}
      {article.thumbnail?.source ? (
        <div className="relative w-full h-[280px] overflow-hidden">
          <Image
            src={article.thumbnail.source}
            alt={article.title}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t pointer-events-none from-[var(--surface)] via-transparent to-transparent" />
        </div>
      ) : (
        <div className="w-full h-[160px] bg-[var(--surface2)] flex items-center justify-center text-6xl opacity-20">
          ◎
        </div>
      )}

      <div className="p-9">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-5">
          <span className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--accent)] bg-[rgba(232,201,122,0.1)] px-2.5 py-1 rounded-full">
            {article.type || 'article'}
          </span>
          <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider">
            {article.lang?.toUpperCase()} · Wikipedia
          </span>
          {article.timestamp && (
            <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider ml-auto">
              {new Date(article.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-playfair text-[36px] font-bold leading-[1.15] tracking-tight mb-4 text-[var(--text)]"
          dangerouslySetInnerHTML={{ __html: article.titles?.display || article.title }}
        />

        {/* Description */}
        {article.description && (
          <p className="text-[13px] text-[var(--accent2)] font-medium mb-5 tracking-wide">
            {article.description}
          </p>
        )}

        {/* Extract */}
        <p className="text-[15px] leading-[1.85] text-[var(--text-muted)] mb-8">
          {article.extract}
        </p>

        {/* Coordinates badge */}
        {article.coordinates && (
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--surface2)] rounded-lg text-[12px] text-[var(--text-muted)] font-mono">
            📍 {article.coordinates.lat.toFixed(3)}°, {article.coordinates.lon.toFixed(3)}°
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={fetchFullHtml}
            disabled={htmlLoading || !!fullHtml}
            className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-[#0a0a0f] rounded-[10px] text-[13px] font-semibold no-underline transition-opacity hover:opacity-88 disabled:opacity-50"
          >
            {htmlLoading ? (
              <><span className="inline-block w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" /> Loading…</>
            ) : fullHtml ? 'Full article loaded 📖' : 'Load full article 📖'}
          </button>
          <a
            href={wikiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-[var(--surface2)] text-[var(--text)] rounded-[10px] text-[13px] font-semibold no-underline transition-opacity hover:opacity-88"
          >
            View on Wikipedia ↗
          </a>
          <button
            onClick={fetchRevision}
            disabled={revLoading}
            className="flex items-center gap-2 px-5 py-2.5 bg-transparent border border-white/[0.07] text-[var(--text-muted)] rounded-[10px] text-[13px] cursor-pointer transition-all hover:border-white/20 hover:text-[var(--text)] hover:bg-[var(--surface2)] disabled:opacity-50"
          >
            {revLoading ? (
              <><span className="inline-block w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" /> Loading…</>
            ) : showRev ? '✕ Hide revision' : '📋 Revision info'}
          </button>
        </div>

        {/* Revision strip */}
        {showRev && revision && (
          <div className="mt-6 p-5 bg-[var(--surface2)] rounded-xl flex flex-wrap gap-5 animate-fade-up">
            {revision.rev && (
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] tracking-[1.5px] uppercase text-[var(--text-dim)]">Revision</span>
                <span className="font-mono text-[12px] text-[var(--text-muted)]">#{revision.rev}</span>
              </div>
            )}
            {revision.timestamp && (
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] tracking-[1.5px] uppercase text-[var(--text-dim)]">Last Edited</span>
                <span className="font-mono text-[12px] text-[var(--text-muted)]">
                  {new Date(revision.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
              </div>
            )}
            {revision.user_text && (
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] tracking-[1.5px] uppercase text-[var(--text-dim)]">Editor</span>
                <span className="font-mono text-[12px] text-[var(--text-muted)]">{revision.user_text}</span>
              </div>
            )}
            {revision.page_language && (
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] tracking-[1.5px] uppercase text-[var(--text-dim)]">Language</span>
                <span className="font-mono text-[12px] text-[var(--text-muted)]">{revision.page_language.toUpperCase()}</span>
              </div>
            )}
            {revision.comment && (
              <div className="flex flex-col gap-1 flex-1">
                <span className="font-mono text-[9px] tracking-[1.5px] uppercase text-[var(--text-dim)]">Edit Note</span>
                <span className="font-mono text-[11px] text-[var(--text-muted)] break-words max-w-[300px]">
                  {revision.comment.substring(0, 100)}{revision.comment.length > 100 ? '…' : ''}
                </span>
              </div>
            )}
          </div>
        )}

        {revError && (
          <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 text-[13px]">
            ⚠ Could not load revision data.
          </div>
        )}

        {htmlError && (
          <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 text-[13px]">
            ⚠ Could not load full article.
          </div>
        )}

        {fullHtml && (
          <div className="mt-6 border border-white/[0.07] rounded-xl overflow-hidden bg-white">
            <iframe sandbox="allow-same-origin allow-scripts"
              srcDoc={fullHtml}
              className="w-full h-[600px] border-none"
              title="Full Article"
            />
          </div>
        )}
      </div>
    </div>
  )
}
