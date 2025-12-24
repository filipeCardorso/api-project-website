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
    accentColor: "primary",
    gradientFrom: "from-primary/80",
    gradientTo: "to-primary",
  },
  {
    number: "02",
    icon: Code2,
    title: "Integre os endpoints",
    description:
      "Use nossa documentacao Swagger para integrar autenticacao e gerenciamento de usuarios.",
    accentColor: "purple-500",
    gradientFrom: "from-purple-400",
    gradientTo: "to-purple-600",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Monitore e escale",
    description:
      "Acompanhe metricas, logs de auditoria e escale conforme sua aplicacao cresce.",
    accentColor: "green-500",
    gradientFrom: "from-green-400",
    gradientTo: "to-green-600",
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Como funciona</h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Comece a usar a API em 3 passos simples
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-px bg-border" />
              )}

              <div className="relative flex flex-col items-center text-center transition-shadow duration-300 group-hover:drop-shadow-xl">
                {/* Number badge with gradient */}
                <div className={`relative z-10 w-24 h-24 rounded-full bg-${step.accentColor}/10 flex items-center justify-center mb-8`}>
                  <step.icon className={`h-10 w-10 text-${step.accentColor}`} />
                  <span className={`absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br ${step.gradientFrom} ${step.gradientTo} text-white text-sm font-bold flex items-center justify-center shadow-lg`}>
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
