"use client"

import { Area, AreaChart, Bar, BarChart,  CartesianGrid, XAxis, YAxis} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart"
import { useState } from "react"
import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"


const chartData = {
  revenue: [
    { month: "Jan", value: 18600 },
    { month: "Feb", value: 22500 },
    { month: "Mar", value: 19800 },
    { month: "Apr", value: 27400 },
    { month: "May", value: 25100 },
    { month: "Jun", value: 31200 },
    { month: "Jul", value: 36800 },
    { month: "Aug", value: 34200 },
  ],

  profit: [
    { month: "Jan", value: 8200 },
    { month: "Feb", value: 10400 },
    { month: "Mar", value: 9100 },
    { month: "Apr", value: 12600 },
    { month: "May", value: 11800 },
    { month: "Jun", value: 15400 },
    { month: "Jul", value: 18200 },
    { month: "Aug", value: 16900 },
  ],

  orders: [
    { month: "Jan", value: 320 },
    { month: "Feb", value: 410 },
    { month: "Mar", value: 365 },
    { month: "Apr", value: 490 },
    { month: "May", value: 450 },
    { month: "Jun", value: 580 },
    { month: "Jul", value: 640 },
    { month: "Aug", value: 610 },
  ],
}

const chartConfig = {
  revenue: {label: "Revenue", color: "var(--primary)",},
  profit: {label: "Profit", color: "var(--secondary)",},
  orders: {label: "Orders", color: "var(--primary)",},
}

export default function OverviewChart() {

  const [activeChart, setActiveChart] = useState("revenue")

  const data = chartData[activeChart]

  return (
    <div className=" text-card-foreground shadow-sm transition-shadow duration-200 col-span-full xl:col-span-7 flux-shadow rounded-2xl border bg-card mt-6 p-6">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-lg font-semibold">Overview</h2>
          <p className="text-sm text-muted-foreground">Monthly performance</p>
        </div>

        <ButtonGroup>
          <Button variant={activeChart === "revenue" ? "default" : "outline"} onClick={() => setActiveChart("revenue")}> Revenue</Button>
          <Button variant={activeChart === "orders" ? "default" : "outline"} onClick={() => setActiveChart("orders")} > Orders </Button>
          <Button variant={activeChart === "profit" ? "default" : "outline"} onClick={() => setActiveChart("profit")} > Profit </Button>
        </ButtonGroup>

      </div>

      {/* Chart */}
      <ChartContainer config={chartConfig} className="w-full" >

        {activeChart === "orders" ? (

          <BarChart accessibilityLayer data={data} >
            <CartesianGrid vertical={false} />

            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8}/>

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                if (activeChart === "orders") {return value}
                return `$${value / 1000}k`
              }}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />}/>

            <Bar dataKey="value" fill="var(--color-orders)" radius={6}/>

          </BarChart>

        ) : (

          <AreaChart accessibilityLayer data={data} margin={{ left: 12, right: 12,}}>
            <CartesianGrid vertical={false} />

            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8}/>

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                if (activeChart === "orders") {return value}
                return `$${value / 1000}k`
              }}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area dataKey="value" type="natural" fill={activeChart === "revenue" ? "var(--color-revenue)" : "var(--color-profit)"} fillOpacity={0.2} stroke={activeChart === "revenue" ? "var(--color-revenue)" : "var(--color-profit)"} strokeWidth={2}/>
          </AreaChart>

        )}

      </ChartContainer>

    </div>
  )
}