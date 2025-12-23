"use client"

import { Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { addOns } from "@/data/add-ons"
import { formatCurrency } from "@/lib/utils"

export function AddOns() {
  return (
    <section className="mt-20">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold">Add-ons</h2>
        <p className="mt-2 text-muted-foreground">
          Personalize seu plano com recursos adicionais
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {addOns.map((addon) => (
          <Card key={addon.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold">{addon.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {addon.description}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <span className="font-semibold">
                    {formatCurrency(addon.price)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {addon.unit}
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                <Plus className="h-4 w-4 mr-1" />
                Adicionar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
