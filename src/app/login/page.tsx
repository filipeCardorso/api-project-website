"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // UI only - no backend integration
    console.log("Login attempt:", { email, password })
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
              <CardTitle className="text-2xl">Entrar na sua conta</CardTitle>
              <CardDescription>
                Digite suas credenciais para acessar o dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium">
                      Senha
                    </label>
                    <Link
                      href="#"
                      className="text-sm text-primary hover:underline"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Sua senha"
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
                </div>

                <Button type="submit" className="w-full">
                  Entrar
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">
                  Nao tem uma conta?{" "}
                </span>
                <Link href="/signup" className="text-primary hover:underline">
                  Criar conta gratis
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  )
}
