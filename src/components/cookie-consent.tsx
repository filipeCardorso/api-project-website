"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie, X, Settings, Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useCookieConsent, CookiePreferences } from "@/contexts/cookie-context"
import Link from "next/link"

const cookieCategories = [
  {
    id: "essential" as const,
    name: "Cookies Essenciais",
    description: "Necessarios para o funcionamento basico do site. Nao podem ser desativados.",
    required: true,
  },
  {
    id: "analytics" as const,
    name: "Cookies de Analytics",
    description: "Nos ajudam a entender como voce usa o site para melhorar a experiencia.",
    required: false,
  },
  {
    id: "marketing" as const,
    name: "Cookies de Marketing",
    description: "Usados para mostrar anuncios relevantes com base nos seus interesses.",
    required: false,
  },
  {
    id: "performance" as const,
    name: "Cookies de Performance",
    description: "Otimizam o carregamento e a velocidade do site.",
    required: false,
  },
]

export function CookieConsentBanner() {
  const { showBanner, acceptAll, rejectAll, savePreferences, preferences } = useCookieConsent()
  const [showDetails, setShowDetails] = React.useState(false)
  const [localPreferences, setLocalPreferences] = React.useState<CookiePreferences>(preferences)

  React.useEffect(() => {
    setLocalPreferences(preferences)
  }, [preferences])

  const handleToggle = (id: keyof CookiePreferences) => {
    if (id === "essential") return // Essenciais nao podem ser desativados
    setLocalPreferences((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleSavePreferences = () => {
    savePreferences(localPreferences)
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-border bg-card/95 backdrop-blur-md shadow-xl">
              {/* Header */}
              <div className="p-4 md:p-6">
                <div className="flex items-start gap-4">
                  <div className="hidden md:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Cookie className="h-6 w-6 text-primary" />
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Sua Privacidade</h3>
                      <button
                        onClick={rejectAll}
                        className="md:hidden p-1 rounded-full hover:bg-muted transition-colors"
                        aria-label="Fechar"
                      >
                        <X className="h-5 w-5 text-muted-foreground" />
                      </button>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Usamos cookies para melhorar sua experiencia, analisar o trafego e personalizar conteudo.
                      Conforme a{" "}
                      <Link href="/privacy-policy" className="text-primary hover:underline">
                        LGPD
                      </Link>
                      , voce pode escolher quais cookies aceitar.{" "}
                      <Link href="/cookie-policy" className="text-primary hover:underline">
                        Saiba mais
                      </Link>
                    </p>

                    {/* Botao para expandir detalhes */}
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      Personalizar preferencias
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${showDetails ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                </div>

                {/* Detalhes expandiveis */}
                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 space-y-3 border-t border-border pt-4">
                        {cookieCategories.map((category) => (
                          <div
                            key={category.id}
                            className="flex items-center justify-between gap-4 rounded-lg bg-muted/50 p-3"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">{category.name}</span>
                                {category.required && (
                                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                    Obrigatorio
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                                {category.description}
                              </p>
                            </div>
                            <Switch
                              checked={localPreferences[category.id]}
                              onCheckedChange={() => handleToggle(category.id)}
                              disabled={category.required}
                              aria-label={`${category.name} ${localPreferences[category.id] ? "ativado" : "desativado"}`}
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer com botoes */}
              <div className="flex flex-col-reverse sm:flex-row items-center gap-2 border-t border-border p-4 bg-muted/30 rounded-b-2xl">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={rejectAll}
                  className="w-full sm:w-auto"
                >
                  Rejeitar todos
                </Button>

                <div className="flex-1" />

                {showDetails ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSavePreferences}
                    className="w-full sm:w-auto"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Salvar preferencias
                  </Button>
                ) : null}

                <Button
                  size="sm"
                  onClick={acceptAll}
                  className="w-full sm:w-auto"
                >
                  Aceitar todos
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Componente menor para footer - permite reabrir preferencias
export function CookieSettingsButton() {
  const { openPreferences, setShowBanner } = useCookieConsent()

  return (
    <button
      onClick={() => setShowBanner(true)}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
    >
      <Cookie className="h-3.5 w-3.5" />
      Cookies
    </button>
  )
}
