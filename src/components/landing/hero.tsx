"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"

export function Hero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl" />
      </div>

      <Container>
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="animate-pulse"
          >
            <Link
              href="/changelog"
              className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Novidade: Audit Logs com retencao estendida
              <ArrowRight className="h-3 w-3" />
            </Link>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="mt-6 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Autenticacao e usuarios{" "}
            <span className="text-primary">prontos em minutos</span> — via API REST
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            JWT + Refresh Token Rotation, verificacao de email, reset de senha,
            rate limiting e audit logs. Swagger UI incluso.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="xl" asChild>
              <Link href="/signup">
                Comecar gratis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="/developer">
                <Play className="h-4 w-4" />
                Ver Docs
              </Link>
            </Button>
          </motion.div>

          {/* API Preview */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative mx-auto max-w-3xl">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 blur-3xl -z-10" />
              <div className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden dark:shadow-[0_0_50px_-12px_rgba(var(--primary),0.3)]">
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">
                    POST /api/auth/login
                  </span>
                </div>
                {/* Code content */}
                <div className="p-4 text-left">
                  <pre className="text-sm font-mono overflow-x-auto">
                    <code className="text-muted-foreground">
{`// Request
{
  "email": "user@example.com",
  "password": "Senha123"
}

// Response 200
{
  "user": {
    "id": 1,
    "name": "Usuario",
    "email": "user@example.com",
    "role": "user"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "550e8400-e29b-41d4-..."
}`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
