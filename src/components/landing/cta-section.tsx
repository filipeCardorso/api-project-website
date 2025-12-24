"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"

export function CTASection() {
  return (
    <section className="relative py-24 md:py-32 bg-primary text-primary-foreground overflow-hidden">
      {/* Diagonal gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-purple-600 opacity-90" />

      <Container className="relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Pronto para comecar?
          </h2>
          <p className="mt-6 text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            Crie sua conta gratuitamente e comece a integrar autenticacao
            e gerenciamento de usuarios na sua aplicacao.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="xl"
              variant="secondary"
              className="relative bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg shadow-lg shadow-white/20 hover:shadow-xl hover:shadow-white/30 transition-all"
              asChild
            >
              <Link href="/signup">
                Comecar gratis
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
              asChild
            >
              <Link href="/developer">Ver documentacao</Link>
            </Button>
          </div>

          <p className="mt-8 text-base opacity-75">
            Sem cartao de credito. 10.000 requests gratis por mes.
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
