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
  { name: "OpenAPI/Swagger", icon: FileCode, color: "text-blue-600 dark:text-blue-400" },
  { name: "Rate Limiting", icon: Shield, color: "text-green-600 dark:text-green-400" },
  { name: "Audit Logs", icon: Zap, color: "text-yellow-600 dark:text-yellow-400" },
  { name: "PostgreSQL", icon: Database, color: "text-purple-600 dark:text-purple-400" },
  { name: "Vercel", icon: Cloud, color: "text-indigo-600 dark:text-indigo-400" },
  { name: "TypeScript", icon: Code2, color: "text-cyan-600 dark:text-cyan-400" },
]

export function BadgeCloud() {
  return (
    <section className="py-24 md:py-32 border-y border-border bg-muted/30">
      <Container>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 md:gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.name}
              className="group flex items-center gap-2.5 px-5 py-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm text-muted-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-black/5 hover:border-border hover:bg-background cursor-default"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <badge.icon className={`h-5 w-5 transition-colors duration-300 group-hover:${badge.color}`} />
              <span className="text-sm font-medium transition-colors duration-300 group-hover:text-foreground">{badge.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
