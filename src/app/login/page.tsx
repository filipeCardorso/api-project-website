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
  }

  return (
    <div className="pt-32 pb-20 min-h-screen flex items-center">
      <Container>
        <div className="max-w-md mx-auto">
          <Card className="shadow-xl border-border/50 backdrop-blur-sm">
            <CardHeader className="text-center space-y-3 pb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg shadow-primary/20 transition-transform hover:scale-105">
                <span className="text-primary-foreground font-bold text-lg">AP</span>
              </div>
              <CardTitle className="text-3xl font-semibold tracking-tight">Entrar na sua conta</CardTitle>
              <CardDescription className="text-base">
                Digite suas credenciais para acessar o dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-foreground">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 transition-all duration-200 focus:ring-4 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-semibold text-foreground">
                      Senha
                    </label>
                    <Link
                      href="#"
                      className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
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
                      className="h-11 transition-all duration-200 focus:ring-4 focus:ring-primary/20 focus:border-primary pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 mt-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 font-semibold"
                >
                  Entrar
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </form>

              <div className="mt-8 text-center text-sm">
                <span className="text-muted-foreground">
                  Nao tem uma conta?{" "}
                </span>
                <Link href="/signup" className="text-primary hover:text-primary/80 transition-colors font-semibold">
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
