// types/calculator.ts
export interface FunnelParams {
    // Custos Fixos
    hostingVSL: number
    hostingSite: number
  
    // Parâmetros Influencer
    costPerPromotion: number
    promotionsCount: number
    estimatedReach: number
  
    // Taxas e Valores
    productPrice: number
    kirvanoFeePercentage: number
    kirvanoFeeFixed: number
    upsellPrice: number
    upsellNetPercentage: number
    upsellCount: number // Novo: quantidade de upsells
  
    // Conversões
    vslConversion: number
    telegramConversion: number
    checkoutConversion: number
    purchaseConversion: number
    upsellConversion: number
  }
  
  export interface FunnelMetrics {
    reachedUsers: number
    vslUsers: number
    telegramUsers: number
    checkoutUsers: number
    purchases: number
    upsells: number
    revenue: number
    costs: number
    profit: number
    roi: number
    breakEven: number
    // Novos campos para gráficos
    upsellBreakdown: Array<{ stage: number, revenue: number }>
    profitBreakdown: {
      productProfit: number
      upsellProfit: number
      costs: {
        kirvanoFees: number
        promotionCosts: number
        fixedCosts: number
      }
    }
  }