import type { Metadata } from "next"
import { Container } from "@/components/layout/container"
import { StatusWidget } from "@/components/shared/status-widget"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Status",
  description: "Status dos servicos da API Project. Verifique a disponibilidade e performance.",
}

const services = [
  { name: "API REST", description: "Endpoints de autenticacao e usuarios" },
  { name: "Database", description: "PostgreSQL (Neon Serverless)" },
  { name: "Email Service", description: "Resend - envio de emails transacionais" },
  { name: "Logging", description: "Axiom - logs estruturados" },
]

export default function StatusPage() {
  return (
    <div className="pt-32 pb-20">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Status
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold">
            Status dos Servicos
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Monitoramento em tempo real da disponibilidade da API
          </p>
        </div>

        {/* Status Widget */}
        <div className="max-w-lg mx-auto mb-16">
          <StatusWidget />
        </div>

        {/* Services List */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Servicos Monitorados</h2>
          <div className="space-y-4">
            {services.map((service) => (
              <Card key={service.name}>
                <CardContent className="flex items-center justify-between py-4">
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                  <Badge variant="success">Operacional</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mt-16 text-center text-sm text-muted-foreground">
          <p>
            Esta pagina verifica o endpoint{" "}
            <code className="bg-muted px-1 py-0.5 rounded">/api/health</code>{" "}
            da API em tempo real.
          </p>
          <p className="mt-2">
            Para historico de incidentes e SLA, consulte nossos planos Business.
          </p>
        </div>
      </Container>
    </div>
  )
}
