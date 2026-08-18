"use client"

import { ArrowUpRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const features = [
  {
    name: "Dashboard",
    value: 82,
  },
  {
    name: "API",
    value: 68,
  },
  {
    name: "Webhooks",
    value: 52,
  },
  {
    name: "Team Mgmt",
    value: 41,
  },
  {
    name: "SSO",
    value: 24,
  },
  {
    name: "Audit Log",
    value: 16,
  },
]

export default function FeatureAdoption() {
  return (
    <div className="text-card-foreground transition-shadow duration-200 col-span-full xl:col-span-5 flux-shadow rounded-2xl border bg-card p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-start justify-between">

        <div>
          <h2 className="text-lg font-semibold">Feature Adoption</h2>
          <p className="mt-1 text-sm text-muted-foreground">% of users using each feature</p>
        </div>

      </div>

      {/* Features */}
      <div className="mt-7 space-y-5">

        {features.map((feature) => (
          <div key={feature.name}>

            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">{feature.name}</span>
              <span className="text-sm text-muted-foreground">{feature.value}%</span>
            </div>

            <Progress value={feature.value} className="h-2" />

          </div>
        ))}

      </div>

    </div>
  )
}