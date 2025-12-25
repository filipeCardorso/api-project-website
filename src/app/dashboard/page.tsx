"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Copy,
  RefreshCw,
  FileText,
  DollarSign,
  LogOut,
  BarChart3,
  Clock,
  Key,
  Check
} from "lucide-react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"

// Mock API key
const mockApiKey = "sk-proj-a8f4e2b1c9d6h3j5k7m8n0p2q4r6s8t1"

// Mock stats
const mockStats = {
  totalRequests: 1234,
  remainingRequests: 8766,
  maxRequests: 10000,
  lastAccess: new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }),
}

export default function DashboardPage() {
  const router = useRouter()
  const auth = useAuth()
  const [copied, setCopied] = useState(false)

  // Check authentication on mount
  useEffect(() => {
    if (!auth.isLoading && !auth.user) {
      router.push("/login")
    }
  }, [auth.user, auth.isLoading, router])

  // Handle logout
  const handleLogout = () => {
    auth.logout()
    router.push("/login")
  }

  // Copy API key to clipboard
  const copyApiKey = () => {
    navigator.clipboard.writeText(mockApiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Mask API key for display
  const maskedApiKey = `${mockApiKey.slice(0, 8)}-xxxx-xxxx-xxxx-${mockApiKey.slice(-4)}`

  // Don't render until auth check is complete
  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    )
  }

  // If not authenticated, return null (will redirect via useEffect)
  if (!auth.user) {
    return null
  }

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <Container>
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                Bem-vindo, {auth.user.name}!
              </h1>
              <p className="text-muted-foreground text-lg">
                {auth.user.email}
              </p>
            </div>
            <Badge variant="gradient" className="text-sm px-4 py-1.5">
              Pro
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Requests */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Requests
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockStats.totalRequests.toLocaleString("pt-BR")}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Desde o inicio
              </p>
            </CardContent>
          </Card>

          {/* Remaining Requests */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Requests Restantes
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockStats.remainingRequests.toLocaleString("pt-BR")}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                de {mockStats.maxRequests.toLocaleString("pt-BR")} disponiveis
              </p>
              {/* Progress bar */}
              <div className="mt-3 w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${(mockStats.remainingRequests / mockStats.maxRequests) * 100}%`,
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Last Access */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ultimo Acesso
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Hoje</div>
              <p className="text-xs text-muted-foreground mt-1">
                {mockStats.lastAccess}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* API Key Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" />
              <CardTitle>Sua Chave de API</CardTitle>
            </div>
            <CardDescription>
              Use esta chave para autenticar suas requisicoes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* API Key Display */}
              <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg border border-border">
                <code className="flex-1 font-mono text-sm">
                  {maskedApiKey}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyApiKey}
                  className="shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copiar
                    </>
                  )}
                </Button>
              </div>

              {/* Regenerate Button */}
              <Button variant="outline" className="w-full sm:w-auto">
                <RefreshCw className="h-4 w-4" />
                Regenerar chave
              </Button>

              <p className="text-xs text-muted-foreground">
                Atencao: Regenerar a chave invalidara a chave atual e pode quebrar
                integrações existentes.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acoes Rapidas</CardTitle>
            <CardDescription>
              Navegue para recursos importantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Documentation */}
              <Button
                asChild
                variant="outline"
                className="h-auto py-4 flex-col items-start hover:border-primary transition-colors"
              >
                <Link href="/developer">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Documentacao</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Guias e referencia da API
                  </span>
                </Link>
              </Button>

              {/* Pricing */}
              <Button
                asChild
                variant="outline"
                className="h-auto py-4 flex-col items-start hover:border-primary transition-colors"
              >
                <Link href="/pricing">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Planos e Precos</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Atualize seu plano
                  </span>
                </Link>
              </Button>

              {/* Logout */}
              <Button
                onClick={handleLogout}
                variant="outline"
                className="h-auto py-4 flex-col items-start hover:border-destructive hover:text-destructive transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <LogOut className="h-5 w-5" />
                  <span className="font-semibold">Sair</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Encerrar sessao
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}
