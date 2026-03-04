'use client'

import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()

  const handleRandom = async () => {
    try {
      const res = await fetch('/api/random')
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
