"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Webhook } from "lucide-react"
import { mockApps } from "@/lib/mock-data"
import type { Webhook as WebhookType } from "@/lib/types"

interface CreateWebhookDialogProps {
  onCreateWebhook: (webhook: Omit<WebhookType, "id" | "created_at">) => void
}

const availableEvents = [
  "lead.created",
  "lead.updated",
  "lead.deleted",
  "task.started",
  "task.completed",
  "task.failed",
  "app.installed",
  "app.uninstalled",
  "user.created",
  "user.updated",
]

export function CreateWebhookDialog({ onCreateWebhook }: CreateWebhookDialogProps) {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState("")
  const [appId, setAppId] = useState("")
  const [selectedEvents, setSelectedEvents] = useState<string[]>([])

  const generateSecret = () => {
    return `wh_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
  }

  const handleEventChange = (event: string, checked: boolean) => {
    if (checked) {
      setSelectedEvents((prev) => [...prev, event])
    } else {
      setSelectedEvents((prev) => prev.filter((e) => e !== event))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url || !appId || selectedEvents.length === 0) return

    const newWebhook: Omit<WebhookType, "id" | "created_at"> = {
      app_id: appId,
      url,
      events: selectedEvents,
      status: "active",
      secret: generateSecret(),
    }

    onCreateWebhook(newWebhook)

    // Reset form
    setUrl("")
    setAppId("")
    setSelectedEvents([])
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#0b2a4a] hover:bg-[#0b2a4a]/90">
          <Plus className="h-4 w-4 mr-2" />
          Create Webhook
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Webhook className="h-5 w-5" />
            Create New Webhook
          </DialogTitle>
          <DialogDescription>Set up a new webhook endpoint to receive event notifications</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Endpoint URL</Label>
            <Input
              id="webhook-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-app.com/webhooks/blackhold"
              required
            />
            <p className="text-xs text-muted-foreground">The URL where webhook events will be sent</p>
          </div>

          <div className="space-y-2">
            <Label>Associated App</Label>
            <Select value={appId} onValueChange={setAppId} required>
              <SelectTrigger>
                <SelectValue placeholder="Select an app" />
              </SelectTrigger>
              <SelectContent>
                {mockApps.map((app) => (
                  <SelectItem key={app.id} value={app.id}>
                    {app.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Events to Subscribe</Label>
            <div className="grid grid-cols-1 gap-3 max-h-48 overflow-y-auto">
              {availableEvents.map((event) => (
                <div key={event} className="flex items-center space-x-2">
                  <Checkbox
                    id={event}
                    checked={selectedEvents.includes(event)}
                    onCheckedChange={(checked) => handleEventChange(event, checked as boolean)}
                  />
                  <Label htmlFor={event} className="text-sm font-normal">
                    {event}
                  </Label>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Select the events you want to receive notifications for</p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-[#0b2a4a] hover:bg-[#0b2a4a]/90">
              Create Webhook
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
