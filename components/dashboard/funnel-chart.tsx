// components/dashboard/funnel-chart.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FunnelMetrics } from "@/types/calculator"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export function FunnelChart({ metrics }: { metrics: FunnelMetrics }) {
  const data = [
    { name: "Alcance", value: metrics.reachedUsers },
    { name: "VSL", value: metrics.vslUsers },
    { name: "Telegram", value: metrics.telegramUsers },
    { name: "Checkout", value: metrics.checkoutUsers },
    { name: "Compras", value: metrics.purchases },
    { name: "Upsells", value: metrics.upsells },
  ]

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Funil de Vendas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar 
                dataKey="value" 
                fill="hsl(var(--primary))" 
                name="Usuários"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}