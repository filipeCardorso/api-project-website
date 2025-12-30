"use client"

import { Metadata } from "next"
import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Cookie, Shield, BarChart3, Megaphone, Zap, Settings } from "lucide-react"
import { useCookieConsent } from "@/contexts/cookie-context"

const cookieCategories = [
  {
    id: "essential",
    icon: Shield,
    name: "Cookies Essenciais",
    description: "Necessarios para o funcionamento basico do site. Sem eles, o site nao funciona corretamente.",
    required: true,
    cookies: [
      {
        name: "session_id",
        purpose: "Manter sua sessao de login ativa",
        duration: "Sessao",
        provider: "API Project",
      },
      {
        name: "csrf_token",
        purpose: "Protecao contra ataques CSRF",
        duration: "Sessao",
        provider: "API Project",
      },
      {
        name: "cookie-consent",
        purpose: "Armazenar suas preferencias de cookies",
        duration: "1 ano",
        provider: "API Project",
      },
    ],
  },
  {
    id: "analytics",
    icon: BarChart3,
    name: "Cookies de Analytics",
    description: "Nos ajudam a entender como os visitantes interagem com o site, permitindo melhorias.",
    required: false,
    cookies: [
      {
        name: "_ga",
        purpose: "Distinguir usuarios unicos",
        duration: "2 anos",
        provider: "Google Analytics",
      },
      {
        name: "_gid",
        purpose: "Distinguir usuarios",
        duration: "24 horas",
        provider: "Google Analytics",
      },
    ],
  },
  {
    id: "marketing",
    icon: Megaphone,
    name: "Cookies de Marketing",
    description: "Usados para rastrear visitantes em sites e exibir anuncios relevantes.",
    required: false,
    cookies: [
      {
        name: "_fbp",
        purpose: "Rastreamento de conversoes",
        duration: "3 meses",
        provider: "Facebook Pixel",
      },
    ],
  },
  {
    id: "performance",
    icon: Zap,
    name: "Cookies de Performance",
    description: "Coletam informacoes sobre como o site e usado para melhorar a velocidade.",
    required: false,
    cookies: [
      {
        name: "_vercel_insights",
        purpose: "Metricas de performance",
        duration: "1 ano",
        provider: "Vercel",
      },
    ],
  },
]

function CookieSettingsSection() {
  const { setShowBanner, preferences } = useCookieConsent()

  return (
    <div className="bg-card border border-border rounded-xl p-6 md:p-8">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Settings className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-2">Suas Preferencias Atuais</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-success/10 text-success text-sm rounded-full">
              Essenciais: Ativo
            </span>
            <span className={`px-3 py-1 text-sm rounded-full ${preferences.analytics ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
              Analytics: {preferences.analytics ? "Ativo" : "Inativo"}
            </span>
            <span className={`px-3 py-1 text-sm rounded-full ${preferences.marketing ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
              Marketing: {preferences.marketing ? "Ativo" : "Inativo"}
            </span>
            <span className={`px-3 py-1 text-sm rounded-full ${preferences.performance ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
              Performance: {preferences.performance ? "Ativo" : "Inativo"}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowBanner(true)}
          >
            <Settings className="w-4 h-4 mr-2" />
            Alterar Preferencias
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function CookiePolicyPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <Cookie className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Politica de Cookies</h1>
          <p className="text-lg text-muted-foreground">
            Esta politica explica como utilizamos cookies e tecnologias similares,
            em conformidade com a LGPD.
          </p>
        </div>

        {/* What are cookies */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-muted/50 rounded-xl p-6">
            <h2 className="font-semibold mb-3">O que sao Cookies?</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Cookies sao pequenos arquivos de texto armazenados no seu dispositivo quando voce
              visita um site. Eles permitem que o site lembre suas acoes e preferencias
              (como login, idioma e outras configuracoes) por um periodo de tempo.
            </p>
          </div>
        </div>

        {/* Cookie Categories */}
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-xl font-semibold">Categorias de Cookies</h2>

          {cookieCategories.map((category) => (
            <div key={category.id} className="border border-border rounded-xl overflow-hidden">
              {/* Category Header */}
              <div className="bg-muted/50 p-4 md:p-6 flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{category.name}</h3>
                    {category.required && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        Obrigatorio
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              </div>

              {/* Cookies Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left p-3 font-medium">Cookie</th>
                      <th className="text-left p-3 font-medium">Finalidade</th>
                      <th className="text-left p-3 font-medium">Duracao</th>
                      <th className="text-left p-3 font-medium">Provedor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.cookies.map((cookie) => (
                      <tr key={cookie.name} className="border-b border-border last:border-0">
                        <td className="p-3 font-mono text-xs">{cookie.name}</td>
                        <td className="p-3 text-muted-foreground">{cookie.purpose}</td>
                        <td className="p-3 text-muted-foreground">{cookie.duration}</td>
                        <td className="p-3 text-muted-foreground">{cookie.provider}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* How to manage cookies */}
        <div className="max-w-3xl mx-auto mt-12 space-y-6">
          <h2 className="text-xl font-semibold">Como Gerenciar Cookies</h2>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Voce pode gerenciar suas preferencias de cookies de duas formas:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">1. Banner de Cookies</h4>
                <p className="text-sm">
                  Use o banner que aparece ao visitar o site pela primeira vez,
                  ou clique em "Cookies" no rodape para reabrir as preferencias.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">2. Configuracoes do Navegador</h4>
                <p className="text-sm">
                  Voce pode configurar seu navegador para bloquear ou excluir cookies.
                  Consulte a documentacao do seu navegador.
                </p>
              </div>
            </div>

            <p className="text-sm">
              <strong className="text-foreground">Importante:</strong> Bloquear cookies essenciais
              pode afetar o funcionamento do site.
            </p>
          </div>
        </div>

        {/* Current Preferences */}
        <div className="max-w-3xl mx-auto mt-12">
          <CookieSettingsSection />
        </div>

        {/* Links */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link href="/privacy-policy" className="text-primary hover:underline">
              Politica de Privacidade
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/security" className="text-primary hover:underline">
              Seguranca
            </Link>
            <span className="text-muted-foreground">|</span>
            <a href="mailto:privacy@apiproject.com" className="text-primary hover:underline">
              Contato
            </a>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Ultima atualizacao: {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
          </p>
        </div>
      </Container>
    </div>
  )
}
