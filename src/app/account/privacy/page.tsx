"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"
import {
  Shield,
  Download,
  Trash2,
  Edit,
  Eye,
  FileText,
  AlertTriangle,
  CheckCircle,
  Loader2,
  ArrowLeft,
  Lock,
} from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api-project-gules.vercel.app"

// Consentimentos disponiveis
const consentOptions = [
  {
    id: "marketing",
    name: "Comunicacoes de Marketing",
    description: "Receber emails sobre novidades, promocoes e atualizacoes do produto.",
  },
  {
    id: "analytics",
    name: "Analytics e Melhorias",
    description: "Permitir coleta de dados anonimos para melhorar o servico.",
  },
  {
    id: "newsletter",
    name: "Newsletter",
    description: "Receber nossa newsletter periodica com dicas e tutoriais.",
  },
  {
    id: "third_party_sharing",
    name: "Compartilhamento com Terceiros",
    description: "Permitir compartilhamento de dados com parceiros selecionados.",
  },
]

export default function PrivacyPortalPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<"access" | "export" | "correct" | "delete" | "consent">("access")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [consents, setConsents] = useState<Record<string, boolean>>({
    marketing: false,
    analytics: false,
    newsletter: false,
    third_party_sharing: false,
  })

  // Form states
  const [correctionData, setCorrectionData] = useState({ name: "", email: "" })
  const [deletePassword, setDeletePassword] = useState("")
  const [deleteReason, setDeleteReason] = useState("")

  // Redirect if not authenticated
  if (!authLoading && !isAuthenticated) {
    return (
      <div className="py-16 md:py-24">
        <Container>
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Acesso Restrito</h1>
            <p className="text-muted-foreground mb-6">
              Voce precisa estar logado para acessar o Portal de Privacidade.
            </p>
            <Button onClick={() => router.push("/login")}>
              Fazer Login
            </Button>
          </div>
        </Container>
      </div>
    )
  }

  const getToken = () => localStorage.getItem("token")

  const handleApiCall = async (endpoint: string, method: string = "GET", body?: object) => {
    const token = getToken()
    if (!token) {
      setMessage({ type: "error", text: "Sessao expirada. Faca login novamente." })
      return null
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Erro desconhecido" }))
      throw new Error(error.error || "Erro na requisicao")
    }

    return response.json()
  }

  // Handlers
  const handleAccessData = async () => {
    setLoading(true)
    setMessage(null)
    try {
      const data = await handleApiCall("/api/privacy/data-access")
      // Abre em nova aba para visualizacao
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      window.open(url, "_blank")
      setMessage({ type: "success", text: "Dados carregados com sucesso!" })
    } catch (error) {
      setMessage({ type: "error", text: (error as Error).message })
    } finally {
      setLoading(false)
    }
  }

  const handleExportData = async () => {
    setLoading(true)
    setMessage(null)
    try {
      const data = await handleApiCall("/api/privacy/data-portability")
      // Download do arquivo
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `meus-dados-${Date.now()}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setMessage({ type: "success", text: "Dados exportados com sucesso!" })
    } catch (error) {
      setMessage({ type: "error", text: (error as Error).message })
    } finally {
      setLoading(false)
    }
  }

  const handleCorrectData = async () => {
    if (!correctionData.name && !correctionData.email) {
      setMessage({ type: "error", text: "Preencha pelo menos um campo para corrigir." })
      return
    }

    setLoading(true)
    setMessage(null)
    try {
      const body: { name?: string; email?: string } = {}
      if (correctionData.name) body.name = correctionData.name
      if (correctionData.email) body.email = correctionData.email

      await handleApiCall("/api/privacy/data-correction", "PATCH", body)
      setMessage({ type: "success", text: "Dados corrigidos com sucesso!" })
      setCorrectionData({ name: "", email: "" })
    } catch (error) {
      setMessage({ type: "error", text: (error as Error).message })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      setMessage({ type: "error", text: "Senha obrigatoria para confirmar exclusao." })
      return
    }

    setLoading(true)
    setMessage(null)
    try {
      await handleApiCall("/api/privacy/delete-account", "POST", {
        password: deletePassword,
        reason: deleteReason || undefined,
      })
      setMessage({ type: "success", text: "Solicitacao enviada! Verifique seu email para confirmar." })
      setDeletePassword("")
      setDeleteReason("")
    } catch (error) {
      setMessage({ type: "error", text: (error as Error).message })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveConsents = async () => {
    setLoading(true)
    setMessage(null)
    try {
      const consentArray = Object.entries(consents).map(([purpose, granted]) => ({
        purpose,
        granted,
      }))

      await handleApiCall("/api/privacy/consent", "POST", { consents: consentArray })
      setMessage({ type: "success", text: "Preferencias salvas com sucesso!" })
    } catch (error) {
      setMessage({ type: "error", text: (error as Error).message })
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: "access" as const, label: "Acessar Dados", icon: Eye },
    { id: "export" as const, label: "Exportar", icon: Download },
    { id: "correct" as const, label: "Corrigir", icon: Edit },
    { id: "consent" as const, label: "Consentimentos", icon: FileText },
    { id: "delete" as const, label: "Excluir Conta", icon: Trash2 },
  ]

  return (
    <div className="py-16 md:py-24">
      <Container>
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Dashboard
          </Link>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Portal de Privacidade</h1>
              <p className="text-muted-foreground">
                Gerencie seus dados pessoais conforme a LGPD (Lei 13.709/2018)
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-4xl mx-auto">
          <div className="flex overflow-x-auto gap-1 p-1 bg-muted rounded-lg mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setMessage(null)
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Message */}
          {message && (
            <div
              className={`flex items-center gap-2 p-4 rounded-lg mb-6 ${
                message.type === "success"
                  ? "bg-success/10 text-success"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              )}
              <p className="text-sm">{message.text}</p>
            </div>
          )}

          {/* Tab Content */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            {/* Access Data */}
            {activeTab === "access" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Acessar Meus Dados</h2>
                  <p className="text-muted-foreground text-sm">
                    LGPD Art. 18, I - Voce tem direito a acessar todos os dados pessoais que
                    armazenamos sobre voce.
                  </p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-medium mb-2">O que esta incluido:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Informacoes da conta (nome, email)</li>
                    <li>• Historico de consentimentos</li>
                    <li>• Logs de atividade recentes</li>
                    <li>• Preferencias salvas</li>
                  </ul>
                </div>

                <Button onClick={handleAccessData} disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Eye className="w-4 h-4 mr-2" />}
                  Visualizar Meus Dados
                </Button>
              </div>
            )}

            {/* Export Data */}
            {activeTab === "export" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Exportar Meus Dados</h2>
                  <p className="text-muted-foreground text-sm">
                    LGPD Art. 18, V - Voce tem direito a portabilidade dos seus dados em formato
                    estruturado e legivel por maquina.
                  </p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Formato de exportacao:</h3>
                  <p className="text-sm text-muted-foreground">
                    JSON (JavaScript Object Notation) - formato padrao interoperavel que pode ser
                    importado em outras plataformas.
                  </p>
                </div>

                <Button onClick={handleExportData} disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                  Baixar Meus Dados
                </Button>
              </div>
            )}

            {/* Correct Data */}
            {activeTab === "correct" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Corrigir Meus Dados</h2>
                  <p className="text-muted-foreground text-sm">
                    LGPD Art. 18, III - Voce tem direito a corrigir dados incompletos, inexatos ou
                    desatualizados.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Novo Nome</label>
                    <Input
                      value={correctionData.name}
                      onChange={(e) => setCorrectionData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Digite seu nome corrigido"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Novo Email</label>
                    <Input
                      type="email"
                      value={correctionData.email}
                      onChange={(e) => setCorrectionData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="Digite seu email corrigido"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Alteracao de email requer nova verificacao.
                    </p>
                  </div>
                </div>

                <Button onClick={handleCorrectData} disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Edit className="w-4 h-4 mr-2" />}
                  Salvar Correcoes
                </Button>
              </div>
            )}

            {/* Consent Management */}
            {activeTab === "consent" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Gerenciar Consentimentos</h2>
                  <p className="text-muted-foreground text-sm">
                    LGPD Art. 8 - Voce pode conceder ou revogar seu consentimento a qualquer momento.
                  </p>
                </div>

                <div className="space-y-4">
                  {consentOptions.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-start justify-between gap-4 p-4 bg-muted/50 rounded-lg"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{option.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{option.description}</p>
                      </div>
                      <Switch
                        checked={consents[option.id]}
                        onCheckedChange={(checked) =>
                          setConsents((prev) => ({ ...prev, [option.id]: checked }))
                        }
                      />
                    </div>
                  ))}
                </div>

                <Button onClick={handleSaveConsents} disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                  Salvar Preferencias
                </Button>
              </div>
            )}

            {/* Delete Account */}
            {activeTab === "delete" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-2 text-destructive">Excluir Minha Conta</h2>
                  <p className="text-muted-foreground text-sm">
                    LGPD Art. 18, VI - Voce tem direito a eliminacao dos seus dados pessoais.
                  </p>
                </div>

                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-destructive">Atencao: Esta acao e irreversivel</h3>
                      <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                        <li>• Todos os seus dados serao permanentemente excluidos</li>
                        <li>• Voce tera 30 dias para cancelar a solicitacao</li>
                        <li>• Apos esse periodo, a exclusao sera definitiva</li>
                        <li>• Um email de confirmacao sera enviado</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Confirme sua senha *</label>
                    <Input
                      type="password"
                      value={deletePassword}
                      onChange={(e) => setDeletePassword(e.target.value)}
                      placeholder="Digite sua senha para confirmar"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Motivo (opcional)</label>
                    <Input
                      value={deleteReason}
                      onChange={(e) => setDeleteReason(e.target.value)}
                      placeholder="Por que voce esta saindo?"
                    />
                  </div>
                </div>

                <Button variant="destructive" onClick={handleDeleteAccount} disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Trash2 className="w-4 h-4 mr-2" />}
                  Solicitar Exclusao
                </Button>
              </div>
            )}
          </div>

          {/* Footer info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Duvidas sobre privacidade?{" "}
              <a href="mailto:dpo@apiproject.com" className="text-primary hover:underline">
                Entre em contato com nosso DPO
              </a>
            </p>
            <div className="flex justify-center gap-4 mt-4 text-sm">
              <Link href="/privacy-policy" className="text-primary hover:underline">
                Politica de Privacidade
              </Link>
              <Link href="/cookie-policy" className="text-primary hover:underline">
                Politica de Cookies
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
