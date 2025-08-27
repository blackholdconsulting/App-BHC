"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Copy, MoreHorizontal, Activity, AlertCircle, CheckCircle, Eye, Trash2, Edit } from "lucide-react"
import type { Webhook } from "@/lib/types"
import { mockApps } from "@/lib/mock-data"
import { useState } from "react"

interface WebhookCardProps {
  webhook: Webhook
  onTest: (webhookId: string) => void
  onDelete: (webhookId: string) => void
  onToggleStatus: (webhookId: string) => void
}

export function WebhookCard({ webhook, onTest, onDelete, onToggleStatus }: WebhookCardProps) {
  const [copied, setCopied] = useState(false)
  const app = mockApps.find((a) => a.id === webhook.app_id)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const getStatusIcon = () => {
    switch (webhook.status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "inactive":
        return <AlertCircle className="h-4 w-4 text-gray-400" />
      default:
        return <Activity className="h-4 w-4 text-blue-600" />
    }
  }

  const getStatusColor = () => {
    switch (webhook.status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg text-balance">Webhook Endpoint</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{app?.name || "Unknown App"}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onTest(webhook.id)}>
                <Activity className="mr-2 h-4 w-4" />
                Test Webhook
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View Logs
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleStatus(webhook.id)}>
                {webhook.status === "active" ? "Disable" : "Enable"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(webhook.id)} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <Badge className={getStatusColor()}>{webhook.status}</Badge>
          </div>
          <span className="text-xs text-muted-foreground">
            Created {new Date(webhook.created_at).toLocaleDateString()}
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Endpoint URL</label>
            <div className="flex items-center gap-2 mt-1">
              <code className="flex-1 px-3 py-2 bg-gray-50 rounded text-sm font-mono break-all">{webhook.url}</code>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(webhook.url)}
                className="flex-shrink-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            {copied && <p className="text-xs text-green-600 mt-1">Copied to clipboard!</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Events</label>
            <div className="flex flex-wrap gap-1 mt-1">
              {webhook.events.map((event) => (
                <Badge key={event} variant="outline" className="text-xs">
                  {event}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Secret Key</label>
            <div className="flex items-center gap-2 mt-1">
              <code className="flex-1 px-3 py-2 bg-gray-50 rounded text-sm font-mono">
                {webhook.secret.substring(0, 20)}...
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(webhook.secret)}
                className="flex-shrink-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={() => onTest(webhook.id)} className="flex-1">
            <Activity className="h-4 w-4 mr-1" />
            Test
          </Button>
          <Button
            variant={webhook.status === "active" ? "destructive" : "default"}
            size="sm"
            onClick={() => onToggleStatus(webhook.id)}
            className="flex-1"
          >
            {webhook.status === "active" ? "Disable" : "Enable"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
