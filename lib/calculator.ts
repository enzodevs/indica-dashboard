// lib/calculator.ts
import { FunnelParams, FunnelMetrics } from "@/types/calculator"

export function calculateMetrics(params: FunnelParams): FunnelMetrics {
  // Cálculos do funil
  const reachedUsers = params.estimatedReach * params.promotionsCount
  const vslUsers = Math.floor(reachedUsers * (params.vslConversion / 100))
  const telegramUsers = Math.floor(vslUsers * (params.telegramConversion / 100))
  const checkoutUsers = Math.floor(telegramUsers * (params.checkoutConversion / 100))
  const purchases = Math.floor(checkoutUsers * (params.purchaseConversion / 100))
  const upsells = Math.floor(purchases * (params.upsellConversion / 100))

  // Cálculos financeiros
  const kirvanoFeePerSale = (params.productPrice * (params.kirvanoFeePercentage / 100)) + params.kirvanoFeeFixed
  const productNetRevenue = params.productPrice - kirvanoFeePerSale
  const productRevenue = purchases * productNetRevenue

  // Cálculo de múltiplos upsells
  const upsellBreakdown = Array.from({ length: params.upsellCount }, (_, i) => {
    const stageRevenue = upsells * (params.upsellPrice * (params.upsellNetPercentage / 100))
    return {
      stage: i + 1,
      revenue: stageRevenue
    }
  })

  const upsellRevenue = upsellBreakdown.reduce((sum, stage) => sum + stage.revenue, 0)
  const revenue = productRevenue + upsellRevenue

  const kirvanoFees = purchases * kirvanoFeePerSale
  const promotionCosts = params.promotionsCount * params.costPerPromotion
  const fixedCosts = params.hostingVSL + params.hostingSite
  const totalCosts = kirvanoFees + promotionCosts + fixedCosts

  const profit = revenue - totalCosts
  const roi = totalCosts > 0 ? (profit / totalCosts) * 100 : 0

  // Break Even em número de vendas
  const revenuePerSale = productNetRevenue + 
    (params.upsellPrice * (params.upsellNetPercentage / 100) * (params.upsellConversion / 100) * params.upsellCount)
  
  const breakEven = Math.ceil(totalCosts / revenuePerSale)

  return {
    reachedUsers,
    vslUsers,
    telegramUsers,
    checkoutUsers,
    purchases,
    upsells,
    revenue,
    costs: totalCosts,
    profit,
    roi,
    breakEven,
    upsellBreakdown,
    profitBreakdown: {
      productProfit: productRevenue,
      upsellProfit: upsellRevenue,
      costs: {
        kirvanoFees,
        promotionCosts,
        fixedCosts
      }
    }
  }
}