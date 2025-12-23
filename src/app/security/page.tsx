import type { Metadata } from "next"
import { Check, Shield, Lock, Key, Eye, FileText, Server } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Seguranca",
  description:
    "Conheca as praticas de seguranca da API Project. JWT, bcrypt, rate limiting, audit logs e mais.",
}

const securityFeatures = [
  {
    icon: Key,
    title: "JWT com Refresh Token Rotation",
    description:
      "Access token de 15 minutos e refresh token de 7 dias. O refresh token e rotacionado a cada uso, invalidando o anterior.",
    checks: [
      "Access token curto (15min)",
      "Refresh token longo (7 dias)",
      "Rotacao automatica",
      "Invalidacao do token antigo",
    ],
  },
  {
    icon: Lock,
    title: "Password Hashing com bcrypt",
    description:
      "Senhas sao hasheadas com bcrypt usando 12 rounds, tornando ataques de forca bruta impraticaveis.",
    checks: [
      "bcrypt 12 rounds",
      "Salt aleatorio por senha",
      "Nunca armazenamos senhas em texto",
    ],
  },
  {
    icon: Shield,
    title: "Rate Limiting por IP",
    description:
      "Protecao contra ataques de forca bruta e DDoS com limites configurados por endpoint e plano.",
    checks: [
      "Limite por IP",
      "Janela deslizante",
      "Limites por endpoint",
      "Headers de rate limit",
    ],
  },
  {
    icon: Server,
    title: "CORS Strict",
    description:
      "Apenas origens explicitamente permitidas podem acessar a API. Wildcard (*) nao e aceito.",
    checks: [
      "Lista de origens permitidas",
      "Sem wildcard",
      "Preflight requests",
      "Headers de seguranca",
    ],
  },
  {
    icon: Eye,
    title: "Security Headers",
    description:
      "Headers de seguranca configurados para proteger contra XSS, clickjacking e outros ataques.",
    checks: [
      "X-Frame-Options: DENY",
      "X-Content-Type-Options: nosniff",
      "X-XSS-Protection: 1; mode=block",
      "X-Request-Id tracking",
    ],
  },
  {
    icon: FileText,
    title: "Audit Logs",
    description:
      "Todas as acoes sao registradas com IP, user agent e timestamp para auditoria e compliance.",
    checks: [
      "Log de todas as acoes",
      "IP e User Agent",
      "Retencao configuravel",
      "Filtros avancados",
    ],
  },
]

const bestPractices = [
  "Nunca exponha seu JWT_SECRET",
  "Use HTTPS em producao",
  "Configure ALLOWED_ORIGINS corretamente",
  "Monitore os audit logs regularmente",
  "Implemente logout em caso de suspeita",
  "Use senhas fortes (min 8 chars, maiuscula, minuscula, numero)",
]

export default function SecurityPage() {
  return (
    <div className="pt-32 pb-20">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Seguranca
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold">
            Seguranca em primeiro lugar
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheca as praticas de seguranca implementadas na API Project
          </p>
        </div>

        {/* Security Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {securityFeatures.map((feature) => (
            <Card key={feature.title}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {feature.description}
                    </p>
                    <ul className="space-y-1">
                      {feature.checks.map((check) => (
                        <li
                          key={check}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Check className="h-4 w-4 text-green-500" />
                          {check}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Best Practices */}
        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Boas Praticas Recomendadas
          </h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {bestPractices.map((practice) => (
                  <li key={practice} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>{practice}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Duvidas sobre seguranca?</h2>
          <p className="text-muted-foreground mb-6">
            Consulte nossa documentacao ou entre em contato
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link href="/developer">Ver Documentacao</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/pricing">Ver Planos</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
