"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Activity } from "lucide-react"
import { WebhookCard } from "./webhook-card"
import { CreateWebhookDialog } from "./create-webhook-dialog"
import { WebhookLogs } from "./webhook-logs"
import { mockWebhooks } from "@/lib/mock-data"
import type { Webhook } from "@/lib/types"

export function WebhookManagement() {
  const [webhooks, setWebhooks] = useState<Webhook[]>(mockWebhooks)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredWebhooks = webhooks.filter(
    (webhook) =>
      webhook.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      webhook.events.some((event) => event.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleCreateWebhook = (newWebhook: Omit<Webhook, "id" | "created_at">) => {
    const webhook: Webhook = {
      ...newWebhook,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    }
    setWebhooks((prev) => [webhook, ...prev])
  }

  const handleTestWebhook = (webhookId: string) => {
    console.log("[v0] Testing webhook:", webhookId)
    // Simulate webhook test
    // In a real app, this would send a test payload to the webhook URL
  }

  const handleDeleteWebhook = (webhookId: string) => {
    setWebhooks((prev) => prev.filter((webhook) => webhook.id !== webhookId))
  }

  const handleToggleStatus = (webhookId: string) => {
    setWebhooks((prev) =>
      prev.map((webhook) =>
        webhook.id === webhookId
          ? { ...webhook, status: webhook.status === "active" ? "inactive" : "active" }
          : webhook,
      ),
    )
  }

  const activeWebhooks = webhooks.filter((w) => w.status === "active").length
  const totalDeliveries = 156 // Mock data
  const successRate = 94.2 // Mock data

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Webhooks</p>
              <p className="text-2xl font-bold">{activeWebhooks}</p>
            </div>
            <Activity className="h-8 w-8 text-[#1ad1ff]" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Deliveries</p>
              <p className="text-2xl font-bold">{totalDeliveries}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 font-bold text-sm">✓</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
              <p className="text-2xl font-bold">{successRate}%</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">%</span>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="webhooks" className="space-y-6">
        <TabsList>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="logs">Delivery Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="webhooks" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search webhooks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <CreateWebhookDialog onCreateWebhook={handleCreateWebhook} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredWebhooks.map((webhook) => (
              <WebhookCard
                key={webhook.id}
                webhook={webhook}
                onTest={handleTestWebhook}
                onDelete={handleDeleteWebhook}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>

          {filteredWebhooks.length === 0 && (
            <div className="text-center py-12">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No webhooks found</h3>
              <p className="text-muted-foreground">Try adjusting your search or create a new webhook</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="logs">
          <WebhookLogs />
        </TabsContent>
      </Tabs>
    </div>
  )
}
