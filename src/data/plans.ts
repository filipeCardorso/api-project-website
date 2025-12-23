export interface Plan {
  id: string
  name: string
  description: string
  priceMonthly: number
  priceYearly: number
  requestsPerMonth: number
  features: string[]
  cta: string
  popular?: boolean
}

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "Para projetos pessoais e testes",
    priceMonthly: 0,
    priceYearly: 0,
    requestsPerMonth: 10000,
    features: [
      "1 projeto",
      "Ate 10k requests/mes",
      "Rate limit basico (10 req/min)",
      "Retencao audit logs 7 dias",
      "Acesso ao Swagger UI",
      "Suporte comunidade",
    ],
    cta: "Comecar gratis",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    description: "Para startups e apps em crescimento",
    priceMonthly: 29,
    priceYearly: 19,
    requestsPerMonth: 100000,
    features: [
      "3 projetos",
      "Ate 100k requests/mes",
      "Rate limit maior (100 req/min)",
      "Retencao audit logs 30 dias",
      "Logs e observabilidade",
      "Suporte por email",
    ],
    cta: "Assinar Pro",
    popular: true,
  },
  {
    id: "business",
    name: "Business",
    description: "Para empresas com alto volume",
    priceMonthly: 99,
    priceYearly: 79,
    requestsPerMonth: 2000000,
    features: [
      "Projetos ilimitados",
      "2M+ requests/mes",
      "Rate limit premium (1000 req/min)",
      "Retencao audit logs 180 dias",
      "Multi-ambiente (dev/stg/prod)",
      "Integracoes e webhooks",
      "SLA 99.9%",
      "Suporte prioritario",
    ],
    cta: "Falar com vendas",
    popular: false,
  },
]

export const requestTiers = [
  { value: 10000, label: "10k" },
  { value: 100000, label: "100k" },
  { value: 500000, label: "500k" },
  { value: 2000000, label: "2M" },
]

export const useCases = {
  b2c: { label: "B2C", description: "Apps para consumidores" },
  b2b: { label: "B2B", description: "Plataformas empresariais" },
}
