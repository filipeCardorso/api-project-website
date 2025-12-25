import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/shared/code-block"
import { endpoints, apiEndpointsList } from "@/data/snippets"

export const metadata: Metadata = {
  title: "Developer Hub",
  description:
    "Documentacao e guias para integrar a API Project. Snippets de codigo, endpoints e exemplos.",
}

const API_URL = "https://api-project-gules.vercel.app"

export default function DeveloperPage() {
  return (
    <div className="pt-32 pb-20">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Developer Hub
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold">
            Comece em 60 segundos
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Integre autenticacao e gerenciamento de usuarios na sua aplicacao
          </p>
        </div>

        {/* Quick links */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Base URL</h3>
              <code className="text-sm bg-muted px-2 py-1 rounded">
                {API_URL}
              </code>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Health Check</h3>
              <Link
                href={`${API_URL}/api/health`}
                target="_blank"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                /api/health
                <ExternalLink className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Swagger UI</h3>
              <Link
                href={`${API_URL}/docs`}
                target="_blank"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                /docs
                <ExternalLink className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Auth Flow */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Fluxo de Autenticacao</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: "1", title: "Register", desc: "Criar conta e receber email de verificacao" },
              { step: "2", title: "Verify Email", desc: "Clicar no link de verificacao" },
              { step: "3", title: "Login", desc: "Receber access + refresh tokens" },
              { step: "4", title: "Refresh", desc: "Renovar tokens quando expirar" },
            ].map((item) => (
              <Card key={item.step}>
                <CardContent className="pt-6">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Code Snippets */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Exemplos de Codigo</h2>
          <Tabs defaultValue={endpoints[0].name}>
            <TabsList className="mb-4">
              {endpoints.map((endpoint) => (
                <TabsTrigger key={endpoint.name} value={endpoint.name}>
                  {endpoint.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {endpoints.map((endpoint) => (
              <TabsContent key={endpoint.name} value={endpoint.name}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="font-mono">
                        {endpoint.method}
                      </Badge>
                      <code className="text-sm">{endpoint.path}</code>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {endpoint.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="curl">
                      <TabsList className="mb-4">
                        {endpoint.snippets.map((snippet) => (
                          <TabsTrigger
                            key={snippet.language}
                            value={snippet.language}
                          >
                            {snippet.label}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {endpoint.snippets.map((snippet) => (
                        <TabsContent
                          key={snippet.language}
                          value={snippet.language}
                        >
                          <CodeBlock
                            code={snippet.code}
                            language={snippet.label}
                          />
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Endpoints Table */}
        <section id="endpoints" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Todos os Endpoints</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold">
                        Metodo
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Endpoint
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">Tag</th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Descricao
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiEndpointsList.map((endpoint, index) => (
                      <tr
                        key={index}
                        className="border-b border-border last:border-0"
                      >
                        <td className="py-3 px-4">
                          <Badge
                            variant={
                              endpoint.method === "GET"
                                ? "secondary"
                                : endpoint.method === "POST"
                                  ? "default"
                                  : endpoint.method === "PUT"
                                    ? "warning"
                                    : "destructive"
                            }
                            className="font-mono text-xs"
                          >
                            {endpoint.method}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <code className="text-sm">{endpoint.path}</code>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{endpoint.tag}</Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {endpoint.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Pronto para comecar?</h2>
          <p className="text-muted-foreground mb-6">
            Crie sua conta e obtenha suas credenciais de API
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">
                Get API Key
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={`${API_URL}/docs`} target="_blank">
                Swagger UI
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
