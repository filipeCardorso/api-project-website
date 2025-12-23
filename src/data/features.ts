import {
  Shield,
  Zap,
  Code2,
  Users,
  Lock,
  BarChart3,
  type LucideIcon,
} from "lucide-react"

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

export const features: Feature[] = [
  {
    icon: Lock,
    title: "Autenticacao Completa",
    description:
      "JWT com access token (15min) e refresh token rotacionado (7 dias). Login, registro, verificacao de email, reset de senha e logout.",
  },
  {
    icon: Shield,
    title: "Seguranca Enterprise",
    description:
      "bcrypt 12 rounds, rate limiting por IP, CORS strict, security headers, audit logs e sem dados sensiveis em logs.",
  },
  {
    icon: Users,
    title: "Gerenciamento de Usuarios",
    description:
      "CRUD completo com paginacao, busca por nome/email, soft delete e roles (user/admin).",
  },
  {
    icon: BarChart3,
    title: "Admin e Auditoria",
    description:
      "Endpoints administrativos para gerenciar roles e visualizar logs de auditoria com filtros por usuario, acao e data.",
  },
  {
    icon: Zap,
    title: "Alta Performance",
    description:
      "Cache in-memory com TTL, deploy serverless na Vercel, respostas rapidas e banco PostgreSQL otimizado.",
  },
  {
    icon: Code2,
    title: "Developer Experience",
    description:
      "Swagger UI completo, TypeScript, validacao Zod, logs estruturados com Pino + Axiom e testes automatizados.",
  },
]

export const credibilityBadges = [
  { name: "OpenAPI/Swagger", icon: "swagger" },
  { name: "Rate Limiting", icon: "shield" },
  { name: "Audit Logs", icon: "clipboard" },
  { name: "PostgreSQL", icon: "database" },
  { name: "Vercel", icon: "vercel" },
  { name: "TypeScript", icon: "typescript" },
]
