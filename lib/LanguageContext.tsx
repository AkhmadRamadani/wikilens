'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
})

export function LanguageProvider({ children, initialLang = 'en' }: { children: React.ReactNode, initialLang?: string }) {
  const [language, setLanguageState] = useState(initialLang)

  useEffect(() => {
    const savedLang = localStorage.getItem('wikilens_language')
    if (savedLang && savedLang !== initialLang) {
      setLanguageState(savedLang)
      document.cookie = `NEXT_LOCALE=${savedLang}; path=/; max-age=31536000`
    }
  }, [initialLang])

  const setLanguage = (lang: string) => {
    setLanguageState(lang)
    localStorage.setItem('wikilens_language', lang)
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
