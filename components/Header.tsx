'use client'

import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/LanguageContext'

export default function Header() {
  const router = useRouter()
  const { language, setLanguage } = useLanguage()

  const handleRandom = async () => {
    try {
      const res = await fetch(`/api/random?lang=${language}`)
      const data = await res.json()
      if (data.titles?.canonical) {
        router.push(`/article/${encodeURIComponent(data.titles.canonical)}`)
      }
    } catch {}
  }

  return (
    <header className="relative z-10 flex items-center justify-between px-12 py-6 border-b border-white/[0.07] backdrop-blur-md">
      <a href="/" className="flex items-baseline gap-2 no-underline cursor-pointer">
        <span className="font-playfair text-[22px] font-black tracking-tight text-[var(--text)]">
          Wiki<span className="text-[var(--accent)]">Lens</span>
        </span>
        <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-[2px] uppercase">
          Powered by Wikimedia
        </span>
      </a>

      <nav className="flex items-center gap-8">
        <a
          href="/"
          className="text-[13px] text-[var(--text-muted)] no-underline tracking-wide transition-colors hover:text-[var(--text)]"
        >
          Explore
        </a>
        <button
          onClick={handleRandom}
          className="text-[13px] text-[var(--text-muted)] no-underline tracking-wide transition-colors hover:text-[var(--text)] bg-transparent border-none cursor-pointer"
        >
          Random
        </button>

        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value)
            window.location.reload()
          }}
          className="bg-[var(--surface2)] text-[12px] text-[var(--text)] border border-white/[0.1] rounded-full px-3 py-1.5 outline-none cursor-pointer hover:border-white/[0.2] transition-colors"
          aria-label="Select language variant"
        >
          <option value="en">English</option>
          <option value="en-gb">British English</option>
          <option value="zh">Chinese</option>
          <option value="zh-hans">Chinese (Simplified)</option>
          <option value="zh-hant">Chinese (Traditional)</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
          <option value="de">German</option>
        </select>

        <a
          href="https://en.wikipedia.org/wiki/Wikipedia:Contributing_to_Wikipedia"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] font-medium bg-[var(--accent)] text-[#0a0a0f] px-[18px] py-2 rounded-full tracking-wide no-underline transition-opacity hover:opacity-90"
        >
          + Contribute
        </a>
      </nav>
    </header>
  )
}
