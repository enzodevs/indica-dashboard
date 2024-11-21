// components/dashboard/control-panel.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { FunnelParams } from "@/types/calculator"

export function ControlPanel({ onChange }: { onChange: (params: FunnelParams) => void }) {
  const [params, setParams] = useState<FunnelParams>({
    hostingVSL: 97,
    hostingSite: 50,
    costPerPromotion: 0,
    promotionsCount: 1,
    estimatedReach: 1000,
    productPrice: 37,
    kirvanoFeePercentage: 4.9,
    kirvanoFeeFixed: 2,
    upsellPrice: 30,
    upsellNetPercentage: 40,
    vslConversion: 50,
    telegramConversion: 50,
    checkoutConversion: 20,
    purchaseConversion: 10,
    upsellConversion: 30,
    upsellCount: 1,
  })

  const handleChange = (key: keyof FunnelParams, value: number) => {
    const newParams = { ...params, [key]: value }
    setParams(newParams)
    onChange(newParams)
  }

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>Controle de Parâmetros</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Custos Fixos */}
          <div className="space-y-4">
            <h3 className="font-medium">Custos Fixos</h3>
            <div className="grid gap-2">
              <label>Hospedagem VSL</label>
              <Input
                type="number"
                value={params.hostingVSL}
                onChange={(e) => handleChange('hostingVSL', Number(e.target.value))}
              />
            </div>
            <div className="grid gap-2">
              <label>Hospedagem Site</label>
              <Input
                type="number"
                value={params.hostingSite}
                onChange={(e) => handleChange('hostingSite', Number(e.target.value))}
              />
            </div>
          </div>

          {/* Parâmetros Influencer */}
          <div className="space-y-4">
            <h3 className="font-medium">Parâmetros Influencer</h3>
            <div className="grid gap-2">
              <label>Custo por Divulgação</label>
              <Input
                type="number"
                value={params.costPerPromotion}
                onChange={(e) => handleChange('costPerPromotion', Number(e.target.value))}
              />
            </div>
            <div className="grid gap-2">
              <label>Quantidade de Divulgações</label>
              <Input
                type="number"
                value={params.promotionsCount}
                onChange={(e) => handleChange('promotionsCount', Number(e.target.value))}
              />
            </div>
            <div className="grid gap-2">
              <label>Alcance Estimado</label>
              <Input
                type="number"
                value={params.estimatedReach}
                onChange={(e) => handleChange('estimatedReach', Number(e.target.value))}
              />
            </div>
            <div className="grid gap-2">
              <label>Valor do Produto</label>
              <Input 
                type="number"
                value={params.productPrice}
                onChange={(e) => handleChange('productPrice', Number(e.target.value))}
              />
            </div>
            <div className="grid gap-2">
              <label>Quantidade de Upsells</label>
              <Input 
                type="number"
                value={params.upsellCount}
                min="1"
                max="5"
                onChange={(e) => handleChange('upsellCount', Number(e.target.value))}
              />
            </div>
          </div>

          {/* Taxas de Conversão */}
          <div className="space-y-4">
            <h3 className="font-medium">Taxas de Conversão (%)</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <label>VSL</label>
                <Slider
                  value={[params.vslConversion]}
                  onValueChange={([value]) => handleChange('vslConversion', value)}
                  max={100}
                  step={1}
                />
                <span className="text-sm text-muted-foreground">{params.vslConversion}%</span>
              </div>

              <div className="space-y-2">
                <label>Telegram</label>
                <Slider
                  value={[params.telegramConversion]}
                  onValueChange={([value]) => handleChange('telegramConversion', value)}
                  max={100}
                  step={1}
                />
                <span className="text-sm text-muted-foreground">{params.telegramConversion}%</span>
              </div>

              <div className="space-y-2">
                <label>Checkout</label>
                <Slider
                  value={[params.checkoutConversion]}
                  onValueChange={([value]) => handleChange('checkoutConversion', value)}
                  max={100}
                  step={1}
                />
                <span className="text-sm text-muted-foreground">{params.checkoutConversion}%</span>
              </div>

              <div className="space-y-2">
                <label>Compra</label>
                <Slider
                  value={[params.purchaseConversion]}
                  onValueChange={([value]) => handleChange('purchaseConversion', value)}
                  max={100}
                  step={1}
                />
                <span className="text-sm text-muted-foreground">{params.purchaseConversion}%</span>
              </div>

              <div className="space-y-2">
                <label>Upsell</label>
                <Slider
                  value={[params.upsellConversion]}
                  onValueChange={([value]) => handleChange('upsellConversion', value)}
                  max={100}
                  step={1}
                />
                <span className="text-sm text-muted-foreground">{params.upsellConversion}%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}