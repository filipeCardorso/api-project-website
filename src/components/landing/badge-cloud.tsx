"use client"

import { motion } from "framer-motion"
import {
  Shield,
  Zap,
  FileCode,
  Database,
  Cloud,
  Code2,
} from "lucide-react"
import { Container } from "@/components/layout/container"

const badges = [
  { name: "OpenAPI/Swagger", icon: FileCode },
  { name: "Rate Limiting", icon: Shield },
  { name: "Audit Logs", icon: Zap },
  { name: "PostgreSQL", icon: Database },
  { name: "Vercel", icon: Cloud },
  { name: "TypeScript", icon: Code2 },
]

export function BadgeCloud() {
  return (
    <section className="py-12 border-y border-border bg-muted/30">
      <Container>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.name}
              className="flex items-center gap-2 text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <badge.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{badge.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
