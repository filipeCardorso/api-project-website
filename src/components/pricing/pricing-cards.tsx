"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { plans } from "@/data/plans"
import { formatCurrency } from "@/lib/utils"

interface PricingCardsProps {
  billing: "monthly" | "yearly"
}

export function PricingCards({ billing }: PricingCardsProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {plans.map((plan) => {
        const price = billing === "yearly" ? plan.priceYearly : plan.priceMonthly
        const yearlyTotal = plan.priceYearly * 12
        const monthlySavings =
          plan.priceMonthly > 0
            ? ((plan.priceMonthly * 12 - yearlyTotal) / (plan.priceMonthly * 12)) * 100
            : 0

        return (
          <Card
            key={plan.id}
            className={`relative h-full flex flex-col ${
              plan.popular ? "border-primary shadow-lg md:scale-105" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="px-3">Mais escolhido</Badge>
              </div>
            )}

            <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </CardHeader>

            <CardContent className="text-center flex-1">
              <div className="my-6">
                <span className="text-5xl font-bold">{formatCurrency(price)}</span>
                {price > 0 && (
                  <span className="text-muted-foreground">/mes</span>
                )}
                {billing === "yearly" && monthlySavings > 0 && (
                  <div className="mt-2">
                    <Badge variant="success" className="text-xs">
                      Economize {monthlySavings.toFixed(0)}%
                    </Badge>
                  </div>
                )}
              </div>

              <ul className="space-y-3 text-left">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                className="w-full"
                size="lg"
                variant={plan.popular ? "default" : "outline"}
                asChild
              >
                <Link href={plan.id === "business" ? "#contact" : "/signup"}>
                  {plan.cta}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
