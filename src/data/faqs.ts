export interface FAQ {
  question: string
  answer: string
}

export const landingFaqs: FAQ[] = [
  {
    question: "Como funciona a autenticacao?",
    answer:
      "Usamos JWT com access token (15 minutos) e refresh token (7 dias). O refresh token e rotacionado a cada uso para maior seguranca - ou seja, apos renovar, o token antigo se torna invalido.",
  },
  {
    question: "Posso testar a API gratuitamente?",
    answer:
      "Sim! O plano Free inclui 10.000 requests por mes, perfeito para desenvolvimento e testes. Voce pode acessar o Swagger UI para explorar todos os endpoints.",
  },
  {
    question: "A API suporta rate limiting?",
    answer:
      "Sim, cada plano tem limites configurados por IP. Free: 10 req/min, Pro: 100 req/min, Business: 1000 req/min. Isso protege contra abusos e garante disponibilidade.",
  },
  {
    question: "Onde posso ver a documentacao completa?",
    answer:
      "A documentacao completa esta disponivel no Swagger UI em /docs. La voce encontra todos os endpoints, schemas, exemplos de request/response e pode testar diretamente.",
  },
]

export const pricingFaqs: FAQ[] = [
  {
    question: "Preciso de cartao de credito para o plano Free?",
    answer:
      "Nao! O plano Free e totalmente gratuito e nao requer cartao de credito. Basta criar uma conta e comecar a usar.",
  },
  {
    question: "O que acontece se eu passar do limite de requests?",
    answer:
      "Quando voce atinge o limite, as requisicoes excedentes retornam erro 429 (Too Many Requests). Voce pode fazer upgrade a qualquer momento para aumentar seu limite.",
  },
  {
    question: "Como funciona o rate limiting?",
    answer:
      "O rate limiting e por IP e usa uma janela deslizante. Por exemplo, no plano Pro com 100 req/min, voce pode fazer ate 100 requisicoes em qualquer janela de 60 segundos.",
  },
  {
    question: "Posso migrar de plano sem downtime?",
    answer:
      "Sim! A migracao entre planos e instantanea e sem downtime. Seus dados, tokens e configuracoes sao mantidos.",
  },
  {
    question: "Por quanto tempo os audit logs sao retidos?",
    answer:
      "Depende do plano: Free (7 dias), Pro (30 dias), Business (180 dias). Logs incluem acoes como login, logout, alteracoes de dados e operacoes administrativas.",
  },
  {
    question: "Voces oferecem SLA?",
    answer:
      "O plano Business inclui SLA de 99.9% de uptime com suporte prioritario. Para planos customizados com SLA mais rigoroso, entre em contato com nosso time de vendas.",
  },
]
