"use client"

import { motion } from "framer-motion"
import { Rocket, Code2, BarChart3 } from "lucide-react"
import { Container } from "@/components/layout/container"

const steps = [
  {
    number: "01",
    icon: Rocket,
    title: "Crie seu projeto",
    description:
      "Cadastre-se e obtenha suas credenciais de API em segundos. Sem configuracao complexa.",
  },
  {
    number: "02",
    icon: Code2,
    title: "Integre os endpoints",
    description:
      "Use nossa documentacao Swagger para integrar autenticacao e gerenciamento de usuarios.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Monitore e escale",
    description:
      "Acompanhe metricas, logs de auditoria e escale conforme sua aplicacao cresce.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Como funciona</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Comece a usar a API em 3 passos simples
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-px bg-border" />
              )}

              <div className="relative flex flex-col items-center text-center">
                {/* Number badge */}
                <div className="relative z-10 w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <step.icon className="h-10 w-10 text-primary" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
