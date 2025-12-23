"use client"

import React, { useState } from "react"
import { Check, X, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const comparisonData = {
  auth: {
    title: "Autenticacao",
    features: [
      { name: "Login/Register", free: true, pro: true, business: true },
      { name: "JWT Access Token", free: true, pro: true, business: true },
      { name: "Refresh Token Rotation", free: true, pro: true, business: true },
      { name: "Verificacao de Email", free: true, pro: true, business: true },
      { name: "Reset de Senha", free: true, pro: true, business: true },
    ],
  },
  users: {
    title: "Usuarios",
    features: [
      { name: "CRUD Completo", free: true, pro: true, business: true },
      { name: "Paginacao e Busca", free: true, pro: true, business: true },
      { name: "Soft Delete", free: true, pro: true, business: true },
      { name: "Roles (user/admin)", free: true, pro: true, business: true },
    ],
  },
  limits: {
    title: "Limites",
    features: [
      { name: "Requests/mes", free: "10k", pro: "100k", business: "2M+" },
      { name: "Rate limit", free: "10/min", pro: "100/min", business: "1000/min" },
      { name: "Projetos", free: "1", pro: "3", business: "Ilimitado" },
      { name: "Ambientes", free: "1", pro: "2", business: "Ilimitado" },
    ],
  },
  audit: {
    title: "Auditoria",
    features: [
      { name: "Audit Logs", free: true, pro: true, business: true },
      { name: "Retencao de Logs", free: "7 dias", pro: "30 dias", business: "180 dias" },
      { name: "Filtros Avancados", free: false, pro: true, business: true },
      { name: "Export de Logs", free: false, pro: false, business: true },
    ],
  },
  security: {
    title: "Seguranca",
    features: [
      { name: "bcrypt Password Hash", free: true, pro: true, business: true },
      { name: "Rate Limiting", free: true, pro: true, business: true },
      { name: "CORS Configuravel", free: true, pro: true, business: true },
      { name: "IP Allowlist", free: false, pro: false, business: true },
      { name: "Webhooks", free: false, pro: true, business: true },
    ],
  },
  support: {
    title: "Suporte",
    features: [
      { name: "Documentacao", free: true, pro: true, business: true },
      { name: "Swagger UI", free: true, pro: true, business: true },
      { name: "Suporte por Email", free: false, pro: true, business: true },
      { name: "Suporte Prioritario", free: false, pro: false, business: true },
      { name: "SLA", free: false, pro: false, business: "99.9%" },
    ],
  },
}

function FeatureValue({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="h-5 w-5 text-primary mx-auto" />
    ) : (
      <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />
    )
  }
  return <span className="text-sm font-medium">{value}</span>
}

export function ComparePlansTable() {
  const [isExpanded, setIsExpanded] = useState(false)
  const categories = Object.values(comparisonData)
  const visibleCategories = isExpanded ? categories : categories.slice(0, 2)

  return (
    <section className="mt-20">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold">Compare os planos</h2>
        <p className="mt-2 text-muted-foreground">
          Veja todas as features disponiveis em cada plano
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full max-w-4xl mx-auto">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-4 font-semibold w-1/2">Feature</th>
              <th className="text-center py-4 px-4 font-semibold">Free</th>
              <th className="text-center py-4 px-4 font-semibold text-primary">Pro</th>
              <th className="text-center py-4 px-4 font-semibold">Business</th>
            </tr>
          </thead>
          <tbody>
            {visibleCategories.map((category) => (
              <React.Fragment key={category.title}>
                <tr className="bg-muted/50">
                  <td colSpan={4} className="py-3 px-4 font-semibold text-sm">
                    {category.title}
                  </td>
                </tr>
                {category.features.map((feature) => (
                  <tr key={feature.name} className="border-b border-border">
                    <td className="py-3 px-4 text-sm">{feature.name}</td>
                    <td className="py-3 px-4 text-center">
                      <FeatureValue value={feature.free} />
                    </td>
                    <td className="py-3 px-4 text-center bg-primary/5">
                      <FeatureValue value={feature.pro} />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <FeatureValue value={feature.business} />
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-6">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="gap-2"
        >
          {isExpanded ? (
            <>
              Mostrar menos
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Ver comparacao completa
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </section>
  )
}
