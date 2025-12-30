"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Container } from "@/components/layout/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Crown,
  Shield,
  Loader2,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  XCircle,
} from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api-project-gules.vercel.app"

interface InviteInfo {
  valid: boolean
  email: string
  role: string
  invitedBy: string
  expiresAt: string
}

function AcceptInviteContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()

  const token = searchParams.get("token")

  const [inviteInfo, setInviteInfo] = useState<InviteInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: "", password: "", confirmPassword: "" })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  // Verify invite token
  useEffect(() => {
    async function verifyInvite() {
      if (!token) {
        setError("Token de convite não fornecido")
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`${API_URL}/api/auth/accept-invite?token=${token}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Convite inválido")
        }

        setInviteInfo(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    verifyInvite()
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate passwords
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    if (formData.password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres")
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch(`${API_URL}/api/auth/accept-invite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          name: formData.name,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao aceitar convite")
      }

      // Login with returned tokens
      localStorage.setItem("accessToken", data.accessToken)
      localStorage.setItem("refreshToken", data.refreshToken)
      localStorage.setItem("user", JSON.stringify(data.user))

      setSuccess(true)

      // Redirect to admin after 2 seconds
      setTimeout(() => {
        window.location.href = "/admin"
      }, 2000)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Verificando convite...</p>
        </div>
      </div>
    )
  }

  if (error && !inviteInfo) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Convite Inválido</h2>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Link href="/login">
                <Button variant="outline">Ir para Login</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Conta Criada!</h2>
              <p className="text-muted-foreground mb-4">
                Sua conta de {inviteInfo?.role === "super_admin" ? "Super Admin" : "Admin"} foi criada com sucesso.
              </p>
              <p className="text-sm text-muted-foreground">
                Redirecionando para o painel admin...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const roleLabel = inviteInfo?.role === "super_admin" ? "Super Administrador" : "Administrador"

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            {inviteInfo?.role === "super_admin" ? (
              <Crown className="w-8 h-8 text-purple-500" />
            ) : (
              <Shield className="w-8 h-8 text-purple-500" />
            )}
          </div>
          <CardTitle className="text-xl">Convite para {roleLabel}</CardTitle>
          <p className="text-muted-foreground text-sm mt-2">
            <strong>{inviteInfo?.invitedBy}</strong> convidou você para ser {roleLabel}.
          </p>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <p className="text-destructive text-sm">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <input
                type="email"
                value={inviteInfo?.email || ""}
                disabled
                className="w-full border rounded-md px-3 py-2 text-sm bg-muted"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Seu Nome</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Digite seu nome completo"
                className="w-full border rounded-md px-3 py-2 text-sm"
                required
                minLength={2}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Senha</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Crie uma senha forte"
                className="w-full border rounded-md px-3 py-2 text-sm"
                required
                minLength={8}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Mínimo 8 caracteres, com maiúscula, minúscula e número
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Confirmar Senha</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Confirme sua senha"
                className="w-full border rounded-md px-3 py-2 text-sm"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Criando conta...
                </>
              ) : (
                <>
                  Aceitar Convite
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t text-center">
            <p className="text-xs text-muted-foreground">
              Convite expira em{" "}
              {inviteInfo?.expiresAt
                ? new Date(inviteInfo.expiresAt).toLocaleString("pt-BR")
                : "..."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AcceptInvitePage() {
  return (
    <Container>
      <Suspense
        fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        }
      >
        <AcceptInviteContent />
      </Suspense>
    </Container>
  )
}
