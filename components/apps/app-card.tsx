"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Download, Eye } from "lucide-react"
import type { App } from "@/lib/types"
import Image from "next/image"

interface AppCardProps {
  app: App
  onInstall: (appId: string) => void
  onViewDetails: (appId: string) => void
  isInstalled?: boolean
}

export function AppCard({ app, onInstall, onViewDetails, isInstalled = false }: AppCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#0b2a4a] to-[#1ad1ff] flex items-center justify-center flex-shrink-0">
            <Image
              src={app.icon || "/placeholder.svg"}
              alt={`${app.name} icon`}
              width={32}
              height={32}
              className="rounded"
            />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg leading-tight text-balance">{app.name}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                {app.category}
              </Badge>
              <span className="text-xs text-muted-foreground">v{app.version}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <CardDescription className="text-sm leading-relaxed text-pretty mb-4">{app.description}</CardDescription>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{app.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>{app.installation_count}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {app.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onViewDetails(app.id)} className="flex-1">
            <Eye className="h-4 w-4 mr-1" />
            Details
          </Button>
          <Button
            size="sm"
            onClick={() => onInstall(app.id)}
            disabled={isInstalled}
            className="flex-1 bg-[#0b2a4a] hover:bg-[#0b2a4a]/90"
          >
            {isInstalled ? "Installed" : "Install"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
