"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/layout/container"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { endpoints } from "@/data/snippets"

export function DevSnippetsTabs() {
  const [activeEndpoint, setActiveEndpoint] = useState(endpoints[0].name)
  const [activeLanguage, setActiveLanguage] = useState("curl")

  return (
    <section className="py-24 md:py-32">
      <Container>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Developer Preview</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Veja como e facil integrar a API no seu projeto
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Endpoint selector */}
          <Tabs value={activeEndpoint} onValueChange={setActiveEndpoint}>
            <TabsList className="w-full justify-start mb-8 flex-wrap h-auto gap-3 bg-transparent p-0">
              {endpoints.map((endpoint) => (
                <TabsTrigger
                  key={endpoint.name}
                  value={endpoint.name}
                  className="transition-all duration-200 hover:scale-105 hover:shadow-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
                >
                  <Badge
                    variant="outline"
                    className="mr-2 text-xs font-mono"
                  >
                    {endpoint.method}
                  </Badge>
                  {endpoint.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {endpoints.map((endpoint) => (
              <TabsContent key={endpoint.name} value={endpoint.name}>
                <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl transition-shadow duration-300 hover:shadow-[0_20px_70px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_70px_-10px_rgba(0,0,0,0.8)] dark:hover:shadow-[0_20px_80px_-5px_rgba(99,102,241,0.3)]">
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-4 bg-muted/50 border-b border-border">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="font-mono text-xs">
                        {endpoint.method}
                      </Badge>
                      <code className="text-sm text-muted-foreground">
                        {endpoint.path}
                      </code>
                    </div>
                    <p className="text-sm text-muted-foreground hidden sm:block">
                      {endpoint.description}
                    </p>
                  </div>

                  {/* Language tabs */}
                  <Tabs value={activeLanguage} onValueChange={setActiveLanguage}>
                    <div className="px-6 pt-4 border-b border-border">
                      <TabsList className="bg-transparent p-0 h-auto gap-6">
                        {endpoint.snippets.map((snippet) => (
                          <TabsTrigger
                            key={snippet.language}
                            value={snippet.language}
                            className="px-0 pb-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent transition-all duration-200 hover:text-primary"
                          >
                            {snippet.label}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </div>

                    {endpoint.snippets.map((snippet) => (
                      <TabsContent
                        key={snippet.language}
                        value={snippet.language}
                        className="m-0"
                      >
                        <pre className="p-6 overflow-x-auto bg-gradient-to-br from-background to-muted/20 dark:from-background dark:to-primary/5 relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:via-transparent dark:to-primary/10 opacity-50 pointer-events-none" />
                          <code className="text-sm font-mono text-muted-foreground relative z-10 block leading-relaxed">
                            {snippet.code}
                          </code>
                        </pre>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </Container>
    </section>
  )
}
