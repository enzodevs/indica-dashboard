// app/page.tsx
"use client"

import { useState } from "react"
import { ControlPanel } from "@/components/dashboard/control-panel"
import { MetricsCards } from "@/components/dashboard/metrics-cards"
import { FunnelChart } from "@/components/dashboard/funnel-chart"
import { calculateMetrics } from "@/lib/calculator"
import { FunnelParams, FunnelMetrics } from "@/types/calculator"
import { ROIChart } from "@/components/dashboard/roi-chart"
import { UpsellBreakdown } from "@/components/dashboard/upsell-breakdown"
import { CostBreakdown } from "@/components/dashboard/cost-breakdown"

export default function Home() {
  const [metrics, setMetrics] = useState<FunnelMetrics>(() => {
    const initialParams: FunnelParams = {
      hostingVSL: 97,
      hostingSite: 50,
      costPerPromotion: 1000,
      promotionsCount: 1,
      estimatedReach: 1000,
      productPrice: 37,
      kirvanoFeePercentage: 4.9,
      kirvanoFeeFixed: 2,
      upsellPrice: 30,
      upsellNetPercentage: 40,
      vslConversion: 10,
      telegramConversion: 50,
      checkoutConversion: 20,
      purchaseConversion: 10,
      upsellConversion: 60,
      upsellCount: 1,
    }
    return calculateMetrics(initialParams)
  })

  const handleParamsChange = (params: FunnelParams) => {
    const newMetrics = calculateMetrics(params)
    setMetrics(newMetrics)
  }

  return (
    <main className="min-h-screen p-6 bg-background">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Dashboard de Vendas</h1>
        
        <ControlPanel onChange={handleParamsChange} />
        
        <MetricsCards metrics={metrics} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FunnelChart metrics={metrics} />
          <ROIChart metrics={metrics} />
          <UpsellBreakdown metrics={metrics} />
          <CostBreakdown metrics={metrics} />
        </div>
      </div>
    </main>
  )
}