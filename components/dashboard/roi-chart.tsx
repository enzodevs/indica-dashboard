// components/dashboard/roi-chart.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FunnelMetrics } from "@/types/calculator"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { formatCurrency } from "@/lib/utils"

export function ROIChart({ metrics }: { metrics: FunnelMetrics }) {
  // Simulamos diferentes quantidades de vendas para mostrar o ponto de break even
  const data = Array.from({ length: metrics.purchases * 2 }, (_, i) => {
    const sales = i + 1
    const revenue = sales * (
      metrics.profitBreakdown.productProfit / metrics.purchases +
      metrics.profitBreakdown.upsellProfit / metrics.purchases
    )
    const variableCosts = sales * (metrics.profitBreakdown.costs.kirvanoFees / metrics.purchases)
    const fixedCosts = metrics.profitBreakdown.costs.fixedCosts + metrics.profitBreakdown.costs.promotionCosts
    const totalCosts = variableCosts + fixedCosts

    return {
      sales,
      revenue,
      costs: totalCosts,
      profit: revenue - totalCosts
    }
  })

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Análise de Break Even</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sales" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(label) => `${label} vendas`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                name="Receita"
              />
              <Line
                type="monotone"
                dataKey="costs"
                stroke="hsl(var(--destructive))"
                name="Custos"
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="hsl(var(--success))"
                name="Lucro"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}