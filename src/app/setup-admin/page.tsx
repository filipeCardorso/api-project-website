"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Crown,
  Loader2,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  XCircle,
  KeyRound,
} from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api-project-gules.vercel.app"

interface SetupStatus {
  setupAvailable: boolean
  hasSetupKey: boolean
  hasExistingAdmin: boolean
}

export default function SetupAdminPage() {
  const router = useRouter()

  const [status, setStatus] = useState<SetupStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    setupKey: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  // Check if setup is available
  useEffect(() => {
    async function checkSetup() {
      try {
        const response = await fetch(`${API_URL}/api/auth/setup-admin`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Erro ao verificar setup")
        }

        setStatus(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    checkSetup()
  }, [])

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
      const response = await fetch(`${API_URL}/api/auth/setup-admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          setupKey: formData.setupKey,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao criar Super Admin")
      }

      setSuccess(true)

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <Container>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Verificando status...</p>
          </div>
        </div>
      </Container>
    )
  }

  if (!status?.setupAvailable) {
    return (
      <Container>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-center">
                {status?.hasExistingAdmin ? (
                  <>
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold mb-2">Setup Concluído</h2>
                    <p className="text-muted-foreground mb-6">
                      Já existe um administrador no sistema. Use o sistema de convites para adicionar novos admins.
                    </p>
                  </>
                ) : (
                  <>
                    <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
                    <h2 className="text-xl font-bold mb-2">Setup Não Disponível</h2>
                    <p className="text-muted-foreground mb-6">
                      A variável ADMIN_SETUP_KEY não está configurada no servidor.
                    </p>
                  </>
                )}
                <Link href="/login">
                  <Button variant="outline">Ir para Login</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    )
  }

  if (success) {
    return (
      <Container>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">Super Admin Criado!</h2>
                <p className="text-muted-foreground mb-4">
                  Sua conta de Super Administrador foi criada com sucesso.
                </p>
                <p className="text-sm text-muted-foreground">
                  Redirecionando para o login...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div className="min-h-[60vh] flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-purple-500" />
            </div>
            <CardTitle className="text-xl">Setup Inicial</CardTitle>
            <p className="text-muted-foreground text-sm mt-2">
              Configure o primeiro Super Administrador do sistema.
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
                <label className="text-sm font-medium mb-1 block">Nome</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Seu nome completo"
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  required
                  minLength={2}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  required
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

              <div>
                <label className="text-sm font-medium mb-1 block flex items-center gap-2">
                  <KeyRound className="w-4 h-4" />
                  Chave de Setup
                </label>
                <input
                  type="password"
                  value={formData.setupKey}
                  onChange={(e) => setFormData({ ...formData, setupKey: e.target.value })}
                  placeholder="Chave secreta de setup"
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Chave definida na variável ADMIN_SETUP_KEY do servidor
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Criando Super Admin...
                  </>
                ) : (
                  <>
                    Criar Super Admin
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t">
              <div className="flex items-start gap-3 text-sm">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                <p className="text-muted-foreground">
                  Este formulário só pode ser usado uma vez. Após criar o primeiro Super Admin,
                  use o sistema de convites para adicionar mais administradores.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
