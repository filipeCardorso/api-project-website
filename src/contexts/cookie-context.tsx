"use client"

import * as React from "react"

export interface CookiePreferences {
  essential: boolean // Sempre true, não pode ser desativado
  analytics: boolean
  marketing: boolean
  performance: boolean
}

interface CookieContextType {
  preferences: CookiePreferences
  hasConsented: boolean
  showBanner: boolean
  setShowBanner: (show: boolean) => void
  acceptAll: () => void
  rejectAll: () => void
  savePreferences: (preferences: Partial<CookiePreferences>) => void
  openPreferences: () => void
}

const defaultPreferences: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
  performance: false,
}

const CookieContext = React.createContext<CookieContextType | undefined>(undefined)

const COOKIE_CONSENT_KEY = "cookie-consent"
const COOKIE_PREFERENCES_KEY = "cookie-preferences"

export function CookieProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = React.useState<CookiePreferences>(defaultPreferences)
  const [hasConsented, setHasConsented] = React.useState(false)
  const [showBanner, setShowBanner] = React.useState(false)
  const [showPreferencesModal, setShowPreferencesModal] = React.useState(false)

  // Carrega preferências do localStorage na inicialização
  React.useEffect(() => {
    const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY)
    const storedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY)

    if (storedConsent === "true" && storedPreferences) {
      try {
        const parsed = JSON.parse(storedPreferences)
        setPreferences({ ...defaultPreferences, ...parsed, essential: true })
        setHasConsented(true)
        setShowBanner(false)
      } catch {
        // Se houver erro, mostra o banner
        setShowBanner(true)
      }
    } else {
      // Primeiro acesso - mostra o banner
      setShowBanner(true)
    }
  }, [])

  const saveToStorage = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true")
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs))
  }

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      performance: true,
    }
    setPreferences(allAccepted)
    setHasConsented(true)
    setShowBanner(false)
    saveToStorage(allAccepted)
  }

  const rejectAll = () => {
    const onlyEssential: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      performance: false,
    }
    setPreferences(onlyEssential)
    setHasConsented(true)
    setShowBanner(false)
    saveToStorage(onlyEssential)
  }

  const savePreferences = (newPreferences: Partial<CookiePreferences>) => {
    const updated: CookiePreferences = {
      ...preferences,
      ...newPreferences,
      essential: true, // Sempre true
    }
    setPreferences(updated)
    setHasConsented(true)
    setShowBanner(false)
    setShowPreferencesModal(false)
    saveToStorage(updated)
  }

  const openPreferences = () => {
    setShowPreferencesModal(true)
  }

  return (
    <CookieContext.Provider
      value={{
        preferences,
        hasConsented,
        showBanner,
        setShowBanner,
        acceptAll,
        rejectAll,
        savePreferences,
        openPreferences,
      }}
    >
      {children}
    </CookieContext.Provider>
  )
}

export function useCookieConsent() {
  const context = React.useContext(CookieContext)
  if (context === undefined) {
    throw new Error("useCookieConsent must be used within a CookieProvider")
  }
  return context
}
