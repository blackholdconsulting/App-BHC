"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Star, Download, Calendar, User, Tag } from "lucide-react"
import type { App } from "@/lib/types"
import Image from "next/image"

interface AppDetailsModalProps {
  app: App | null
  isOpen: boolean
  onClose: () => void
  onInstall: (appId: string) => void
  isInstalled?: boolean
}

export function AppDetailsModal({ app, isOpen, onClose, onInstall, isInstalled = false }: AppDetailsModalProps) {
  if (!app) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-[#0b2a4a] to-[#1ad1ff] flex items-center justify-center flex-shrink-0">
              <Image
                src={app.icon || "/placeholder.svg"}
                alt={`${app.name} icon`}
                width={48}
                height={48}
                className="rounded"
              />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl text-balance">{app.name}</DialogTitle>
              <DialogDescription className="text-base mt-1">{app.description}</DialogDescription>
              <div className="flex items-center gap-4 mt-3">
                <Badge className="bg-[#0b2a4a] text-white">{app.category}</Badge>
                <span className="text-sm text-muted-foreground">Version {app.version}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{app.rating}</span>
                <span className="text-sm text-muted-foreground">rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{app.installation_count}</span>
                <span className="text-sm text-muted-foreground">installs</span>
              </div>
            </div>
            <Button
              onClick={() => onInstall(app.id)}
              disabled={isInstalled}
              className="bg-[#0b2a4a] hover:bg-[#0b2a4a]/90"
            >
              {isInstalled ? "Installed" : "Install App"}
            </Button>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Features
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {app.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#1ad1ff]" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-3">Screenshots</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {app.screenshots.map((screenshot, index) => (
                <div key={index} className="rounded-lg overflow-hidden border">
                  <Image
                    src={screenshot || "/placeholder.svg"}
                    alt={`${app.name} screenshot ${index + 1}`}
                    width={300}
                    height={200}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <User className="h-4 w-4" />
                Developer
              </h3>
              <p className="text-sm text-muted-foreground">{app.developer}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Last Updated
              </h3>
              <p className="text-sm text-muted-foreground">{new Date(app.updated_at).toLocaleDateString()}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {app.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
