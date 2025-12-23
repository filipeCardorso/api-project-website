"use client"

import { useState } from "react"
import { Container } from "@/components/layout/container"
import { PricingSelectors } from "@/components/pricing/pricing-selectors"
import { PricingCards } from "@/components/pricing/pricing-cards"
import { AddOns } from "@/components/pricing/add-ons"
import { ComparePlansTable } from "@/components/pricing/compare-plans-table"
import { PricingFAQ } from "@/components/pricing/pricing-faq"

export default function PricingPage() {
  const [useCase, setUseCase] = useState<"b2c" | "b2b">("b2c")
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly")
  const [requestVolume, setRequestVolume] = useState(100000)

  return (
    <div className="pt-32 pb-20">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Precos simples e transparentes
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Pague pelo uso (requests/projetos), nao por usuarios inativos.
            Comece gratis e escale conforme seu crescimento.
          </p>
        </div>

        {/* Selectors */}
        <PricingSelectors
          useCase={useCase}
          onUseCaseChange={setUseCase}
          billing={billing}
          onBillingChange={setBilling}
          requestVolume={requestVolume}
          onRequestVolumeChange={setRequestVolume}
        />

        {/* Pricing Cards */}
        <PricingCards billing={billing} />

        {/* Add-ons */}
        <AddOns />

        {/* Compare Plans */}
        <ComparePlansTable />

        {/* FAQ */}
        <PricingFAQ />
      </Container>
    </div>
  )
}
