"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"

const passwordRequirements = [
  { label: "Minimo 8 caracteres", test: (p: string) => p.length >= 8 },
  { label: "Pelo menos 1 letra maiuscula", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Pelo menos 1 letra minuscula", test: (p: string) => /[a-z]/.test(p) },
  { label: "Pelo menos 1 numero", test: (p: string) => /[0-9]/.test(p) },
]

export default function SignupPage() {
  const router = useRouter()
  const auth = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (auth.isAuthenticated && !auth.isLoading) {
      router.push("/dashboard")
    }
  }, [auth.isAuthenticated, auth.isLoading, router])

  const validatePassword = () => {
    return passwordRequirements.every((req) => req.test(password))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    // Validate all password requirements
    if (!validatePassword()) {
      setError("A senha não atende aos requisitos mínimos")
      return
    }

    setIsLoading(true)

    try {
      await auth.register(name, email, password)
      setSuccess(true)

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao criar conta"
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="pt-32 pb-20 min-h-screen flex items-center">
      <Container>
        <div className="max-w-md mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-105">
                <span className="text-primary-foreground font-bold text-lg">AP</span>
              </div>
              <CardTitle className="text-3xl font-bold tracking-tight">Criar sua conta</CardTitle>
              <CardDescription className="text-base mt-2">
                Comece gratis com 10.000 requests por mes
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Error message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              {/* Success message */}
              {success && (
                <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Conta criada! Verifique seu email para ativar.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Nome
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="transition-all focus:ring-4 focus:ring-primary/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="transition-all focus:ring-4 focus:ring-primary/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">
                    Senha
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Crie uma senha forte"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="transition-all focus:ring-4 focus:ring-primary/20"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {/* Password requirements */}
                  {password && (
                    <ul className="mt-3 space-y-1.5">
                      {passwordRequirements.map((req) => (
                        <li
                          key={req.label}
                          className={`flex items-center gap-2 text-xs transition-colors ${
                            req.test(password)
                              ? "text-green-600"
                              : "text-muted-foreground"
                          }`}
                        >
                          <Check
                            className={`h-3 w-3 transition-opacity ${
                              req.test(password) ? "opacity-100" : "opacity-30"
                            }`}
                          />
                          {req.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full mt-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all"
                  disabled={isLoading || success}
                >
                  {isLoading ? "Criando conta..." : success ? "Conta criada!" : "Criar conta"}
                  {!isLoading && !success && <ArrowRight className="h-4 w-4 ml-2" />}
                </Button>
              </form>

              <p className="mt-6 text-xs text-center text-muted-foreground leading-relaxed">
                Ao criar uma conta, voce concorda com nossos{" "}
                <Link href="#" className="text-primary hover:underline transition-colors">
                  Termos de Uso
                </Link>{" "}
                e{" "}
                <Link href="#" className="text-primary hover:underline transition-colors">
                  Politica de Privacidade
                </Link>
                .
              </p>

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Ja tem uma conta? </span>
                <Link href="/login" className="text-primary hover:underline font-medium transition-colors">
                  Entrar
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  )
}
