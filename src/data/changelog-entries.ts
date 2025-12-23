export interface ChangelogEntry {
  version: string
  date: string
  title: string
  description: string
  changes: {
    type: "feature" | "improvement" | "fix" | "security"
    text: string
  }[]
}

export const changelogEntries: ChangelogEntry[] = [
  {
    version: "1.2.0",
    date: "2024-12-20",
    title: "Audit Logs e Melhorias de Seguranca",
    description: "Novo sistema de audit logs e melhorias significativas na seguranca.",
    changes: [
      { type: "feature", text: "Sistema completo de audit logs com filtros por usuario, acao e data" },
      { type: "feature", text: "Endpoint administrativo para visualizar logs de auditoria" },
      { type: "security", text: "Implementacao de rate limiting por IP em todos os endpoints" },
      { type: "improvement", text: "Melhoria na rotacao de refresh tokens" },
      { type: "fix", text: "Correcao de bug no soft delete de usuarios" },
    ],
  },
  {
    version: "1.1.0",
    date: "2024-12-15",
    title: "Reset de Senha e Verificacao de Email",
    description: "Fluxos completos de recuperacao de senha e verificacao de email.",
    changes: [
      { type: "feature", text: "Endpoint forgot-password para solicitar reset de senha" },
      { type: "feature", text: "Endpoint reset-password para definir nova senha" },
      { type: "feature", text: "Verificacao de email obrigatoria antes do login" },
      { type: "feature", text: "Endpoint para reenviar email de verificacao" },
      { type: "improvement", text: "Templates de email melhorados com Resend" },
    ],
  },
  {
    version: "1.0.0",
    date: "2024-12-10",
    title: "Lancamento Inicial",
    description: "Primeira versao publica da API com autenticacao JWT e CRUD de usuarios.",
    changes: [
      { type: "feature", text: "Autenticacao JWT com access e refresh tokens" },
      { type: "feature", text: "CRUD completo de usuarios com paginacao e busca" },
      { type: "feature", text: "Roles de usuario (user/admin)" },
      { type: "feature", text: "Swagger UI para documentacao interativa" },
      { type: "feature", text: "Health check endpoint com metricas do sistema" },
      { type: "security", text: "Hash de senhas com bcrypt (12 rounds)" },
      { type: "security", text: "Headers de seguranca (X-Frame-Options, X-Content-Type-Options, etc.)" },
    ],
  },
]
