// components/dashboard/metrics-cards.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FunnelMetrics } from "@/types/calculator"
import { formatCurrency } from "@/lib/utils"

export function MetricsCards({ metrics }: { metrics: FunnelMetrics }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">ROI</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.roi.toFixed(2)}%</div>
          <p className="text-xs text-muted-foreground">
            Retorno sobre investimento
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Break Even</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.breakEven.toFixed(0)}</div>
          <p className="text-xs text-muted-foreground">
            Vendas necessárias
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(metrics.revenue)}</div>
          <p className="text-xs text-muted-foreground">
            Incluindo upsells
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(metrics.profit)}</div>
          <p className="text-xs text-muted-foreground">
            Após todos os custos
          </p>
        </CardContent>
      </Card>
    </div>
  )
}