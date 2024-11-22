// components/dashboard/cost-breakdown.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FunnelMetrics } from "@/types/calculator"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { formatCurrency } from "@/lib/utils"

export function CostBreakdown({ metrics }: { metrics: FunnelMetrics }) {
  const data = [
    { name: "Kirvano Fees", value: metrics.profitBreakdown.costs.kirvanoFees },
    { name: "Promotion Costs", value: metrics.profitBreakdown.costs.promotionCosts },
    { name: "Fixed Costs", value: metrics.profitBreakdown.costs.fixedCosts },
  ]

  const totalCost = data.reduce((sum, entry) => sum + entry.value, 0)

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

  const renderCustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0]
      const percentage = ((value / totalCost) * 100).toFixed(2)
      return (
        <div className="bg-white p-2 border border-gray-200 rounded">
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs">
            {formatCurrency(value)} ({percentage}%)
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={renderCustomTooltip} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}