import type { Metadata } from "next"
import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { changelogEntries } from "@/data/changelog-entries"

export const metadata: Metadata = {
  title: "Changelog",
  description: "Historico de atualizacoes e novidades da API Project.",
}

const typeColors = {
  feature: "bg-green-500",
  improvement: "bg-blue-500",
  fix: "bg-yellow-500",
  security: "bg-red-500",
}

const typeLabels = {
  feature: "Feature",
  improvement: "Melhoria",
  fix: "Correcao",
  security: "Seguranca",
}

export default function ChangelogPage() {
  return (
    <div className="pt-32 pb-20">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Changelog
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold">Novidades</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Acompanhe as atualizacoes e melhorias da API
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />

            {/* Entries */}
            <div className="space-y-8">
              {changelogEntries.map((entry) => (
                <div key={entry.version} className="relative pl-20">
                  {/* Version badge */}
                  <div className="absolute left-0 w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    v{entry.version}
                  </div>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <CardTitle>{entry.title}</CardTitle>
                        <Badge variant="outline">{entry.date}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {entry.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {entry.changes.map((change, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Badge
                              className={`${typeColors[change.type]} text-white text-xs shrink-0`}
                            >
                              {typeLabels[change.type]}
                            </Badge>
                            <span className="text-sm">{change.text}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
