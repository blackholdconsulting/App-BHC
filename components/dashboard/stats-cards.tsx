"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Store, Calendar, Webhook, Users } from "lucide-react"
import { mockInstallations, mockTasks, mockLeads } from "@/lib/mock-data"

export function StatsCards() {
  const stats = [
    {
      title: "Installed Apps",
      value: mockInstallations.length,
      change: "+2",
      changeType: "increase" as const,
      icon: Store,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Tasks",
      value: mockTasks.filter((t) => t.status === "running" || t.status === "pending").length,
      change: "+5",
      changeType: "increase" as const,
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Webhooks",
      value: 12,
      change: "0",
      changeType: "neutral" as const,
      icon: Webhook,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "New Leads",
      value: mockLeads.filter((l) => l.status === "new").length,
      change: "+3",
      changeType: "increase" as const,
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.change !== "0" && (
                <Badge
                  variant={stat.changeType === "increase" ? "default" : "destructive"}
                  className="flex items-center gap-1"
                >
                  {stat.changeType === "increase" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {stat.change}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
