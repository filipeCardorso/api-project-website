"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/layout/container"
import { Card, CardContent } from "@/components/ui/card"
import { features } from "@/data/features"

const iconColors = [
  "primary",
  "purple-500",
  "green-500",
  "orange-500",
  "pink-500",
  "cyan-500"
]

export function FeatureGrid() {
  return (
    <section id="features" className="py-24 md:py-32 bg-muted/30">
      <Container>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Tudo que voce precisa para gerenciar usuarios
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            API completa com autenticacao, seguranca e observabilidade
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const colorClass = iconColors[index % iconColors.length]
            const bgColor = colorClass === "primary" ? "bg-primary/10" : `bg-${colorClass}/10`
            const textColor = colorClass === "primary" ? "text-primary" : `text-${colorClass}`

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg hover:border-primary/20 transition-all duration-200">
                  <CardContent className="pt-6">
                    <div className={`w-14 h-14 rounded-lg ${bgColor} flex items-center justify-center mb-4`}>
                      <feature.icon className={`h-6 w-6 ${textColor}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
