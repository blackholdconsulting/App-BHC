"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle, XCircle, Clock, RefreshCw } from "lucide-react"

interface WebhookLog {
  id: string
  webhook_id: string
  event: string
  status: "success" | "failed" | "pending"
  response_code?: number
  response_time?: number
  timestamp: string
  payload: any
  error?: string
}

const mockLogs: WebhookLog[] = [
  {
    id: "1",
    webhook_id: "1",
    event: "lead.created",
    status: "success",
    response_code: 200,
    response_time: 145,
    timestamp: "2024-03-20T14:30:00Z",
    payload: { id: "lead_123", name: "John Doe", email: "john@example.com" },
  },
  {
    id: "2",
    webhook_id: "1",
    event: "lead.updated",
    status: "success",
    response_code: 200,
    response_time: 98,
    timestamp: "2024-03-20T13:15:00Z",
    payload: { id: "lead_123", status: "contacted" },
  },
  {
    id: "3",
    webhook_id: "1",
    event: "lead.created",
    status: "failed",
    response_code: 500,
    response_time: 5000,
    timestamp: "2024-03-20T12:00:00Z",
    payload: { id: "lead_124", name: "Jane Smith", email: "jane@example.com" },
    error: "Internal Server Error",
  },
  {
    id: "4",
    webhook_id: "1",
    event: "task.completed",
    status: "pending",
    timestamp: "2024-03-20T11:45:00Z",
    payload: { id: "task_456", name: "Daily Sync", result: "success" },
  },
]

export function WebhookLogs() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Webhook Deliveries</CardTitle>
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {mockLogs.map((log) => (
              <div key={log.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(log.status)}
                    <Badge variant="outline">{log.event}</Badge>
                    <Badge className={getStatusColor(log.status)}>{log.status}</Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {log.response_code && (
                    <div>
                      <span className="text-muted-foreground">Status Code:</span>
                      <p className="font-medium">{log.response_code}</p>
                    </div>
                  )}
                  {log.response_time && (
                    <div>
                      <span className="text-muted-foreground">Response Time:</span>
                      <p className="font-medium">{log.response_time}ms</p>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">Event:</span>
                    <p className="font-medium">{log.event}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <p className="font-medium capitalize">{log.status}</p>
                  </div>
                </div>

                {log.error && (
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-sm font-medium text-red-800">Error:</p>
                    <p className="text-sm text-red-700">{log.error}</p>
                  </div>
                )}

                <details className="group">
                  <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
                    View Payload
                  </summary>
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <pre className="text-xs overflow-x-auto">{JSON.stringify(log.payload, null, 2)}</pre>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
