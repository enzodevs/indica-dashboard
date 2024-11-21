// components/dashboard/upsell-breakdown.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FunnelMetrics } from "@/types/calculator"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { formatCurrency } from "@/lib/utils"

export function UpsellBreakdown({ metrics }: { metrics: FunnelMetrics }) {
  const data = metrics.upsellBreakdown.map((stage) => ({
    name: `Upsell ${stage.stage}`,
    revenue: stage.revenue
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Receita por Upsell</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}