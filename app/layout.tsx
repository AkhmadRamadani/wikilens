import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import './globals.css'
import { LanguageProvider } from '@/lib/LanguageContext'

export const metadata: Metadata = {
  title: 'WikiLens — Explore Knowledge',
  description: 'A modern, beautiful interface for Wikipedia powered by the Wikimedia REST API',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>◎</text></svg>',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en'

  return (
    <html lang={lang}>
      <body>
        <LanguageProvider initialLang={lang}>{children}</LanguageProvider>
      </body>
    </html>
  )
}
