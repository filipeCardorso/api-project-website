"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { useCases, requestTiers } from "@/data/plans"
import { formatNumber } from "@/lib/utils"

interface PricingSelectorsProps {
  useCase: "b2c" | "b2b"
  onUseCaseChange: (value: "b2c" | "b2b") => void
  billing: "monthly" | "yearly"
  onBillingChange: (value: "monthly" | "yearly") => void
  requestVolume: number
  onRequestVolumeChange: (value: number) => void
}

export function PricingSelectors({
  useCase,
  onUseCaseChange,
  billing,
  onBillingChange,
  requestVolume,
  onRequestVolumeChange,
}: PricingSelectorsProps) {
  const sliderIndex = requestTiers.findIndex((t) => t.value === requestVolume)

  return (
    <div className="space-y-8 mb-12">
      {/* Top row: Use case + Billing toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        {/* Use case selector */}
        <Tabs value={useCase} onValueChange={(v) => onUseCaseChange(v as "b2c" | "b2b")}>
          <TabsList>
            <TabsTrigger value="b2c">{useCases.b2c.label}</TabsTrigger>
            <TabsTrigger value="b2b">{useCases.b2b.label}</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Billing toggle */}
        <div className="flex items-center gap-3">
          <span
            className={`text-sm ${billing === "monthly" ? "text-foreground" : "text-muted-foreground"}`}
          >
            Mensal
          </span>
          <Switch
            checked={billing === "yearly"}
            onCheckedChange={(checked) => onBillingChange(checked ? "yearly" : "monthly")}
          />
          <span
            className={`text-sm ${billing === "yearly" ? "text-foreground" : "text-muted-foreground"}`}
          >
            Anual
          </span>
          {billing === "yearly" && (
            <Badge variant="success" className="ml-1">
              2 meses gratis
            </Badge>
          )}
        </div>
      </div>

      {/* Request volume slider */}
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground">Requests/mes</span>
          <span className="text-sm font-medium">
            {formatNumber(requestVolume)}
          </span>
        </div>
        <Slider
          value={[sliderIndex >= 0 ? sliderIndex : 0]}
          min={0}
          max={requestTiers.length - 1}
          step={1}
          onValueChange={([index]) => onRequestVolumeChange(requestTiers[index].value)}
        />
        <div className="flex justify-between mt-2">
          {requestTiers.map((tier) => (
            <span
              key={tier.value}
              className={`text-xs ${
                requestVolume === tier.value
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {tier.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
