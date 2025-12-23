export interface AddOn {
  id: string
  name: string
  description: string
  price: number
  unit: string
}

export const addOns: AddOn[] = [
  {
    id: "retention-365",
    name: "Retencao Estendida",
    description: "Mantenha seus audit logs por 365 dias",
    price: 19,
    unit: "/mes",
  },
  {
    id: "ip-allowlist",
    name: "IP Allowlist",
    description: "Restrinja acesso a IPs especificos",
    price: 29,
    unit: "/mes",
  },
  {
    id: "webhooks",
    name: "Webhooks",
    description: "Receba eventos em tempo real (user.created, user.updated, etc.)",
    price: 19,
    unit: "/mes",
  },
  {
    id: "extra-env",
    name: "Ambiente Extra",
    description: "Adicione mais um ambiente (dev, staging, prod)",
    price: 39,
    unit: "/mes",
  },
  {
    id: "priority-support",
    name: "Suporte Prioritario",
    description: "Tempo de resposta garantido em 4 horas",
    price: 99,
    unit: "/mes",
  },
]
