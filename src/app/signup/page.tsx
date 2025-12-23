"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const passwordRequirements = [
  { label: "Minimo 8 caracteres", test: (p: string) => p.length >= 8 },
  { label: "Pelo menos 1 letra maiuscula", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Pelo menos 1 letra minuscula", test: (p: string) => /[a-z]/.test(p) },
  { label: "Pelo menos 1 numero", test: (p: string) => /[0-9]/.test(p) },
]

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // UI only - no backend integration
    console.log("Signup attempt:", { name, email, password })
  }

  return (
    <div className="pt-32 pb-20 min-h-screen flex items-center">
      <Container>
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-bold">AP</span>
              </div>
              <CardTitle className="text-2xl">Criar sua conta</CardTitle>
              <CardDescription>
                Comece gratis com 10.000 requests por mes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nome
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Senha
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Crie uma senha forte"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
                    <ul className="mt-2 space-y-1">
                      {passwordRequirements.map((req) => (
                        <li
                          key={req.label}
                          className={`flex items-center gap-2 text-xs ${
                            req.test(password)
                              ? "text-green-600"
                              : "text-muted-foreground"
                          }`}
                        >
                          <Check
                            className={`h-3 w-3 ${
                              req.test(password) ? "opacity-100" : "opacity-30"
                            }`}
                          />
                          {req.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  Criar conta
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>

              <p className="mt-4 text-xs text-center text-muted-foreground">
                Ao criar uma conta, voce concorda com nossos{" "}
                <Link href="#" className="text-primary hover:underline">
                  Termos de Uso
                </Link>{" "}
                e{" "}
                <Link href="#" className="text-primary hover:underline">
                  Politica de Privacidade
                </Link>
                .
              </p>

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Ja tem uma conta? </span>
                <Link href="/login" className="text-primary hover:underline">
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
