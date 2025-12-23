"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"

export function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <Container>
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Pronto para comecar?
          </h2>
          <p className="mt-4 text-lg opacity-90 max-w-xl mx-auto">
            Crie sua conta gratuitamente e comece a integrar autenticacao
            e gerenciamento de usuarios na sua aplicacao.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="xl"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
              asChild
            >
              <Link href="/signup">
                Comecar gratis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              asChild
            >
              <Link href="/developer">Ver documentacao</Link>
            </Button>
          </div>

          <p className="mt-6 text-sm opacity-75">
            Sem cartao de credito. 10.000 requests gratis por mes.
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
