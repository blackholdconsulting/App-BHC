"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, ExternalLink, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { mockApps, mockInstallations } from "@/lib/mock-data"
import Image from "next/image"

export function InstalledApps() {
  const installedApps = mockInstallations
    .map((installation) => {
      const app = mockApps.find((a) => a.id === installation.app_id)
      return { ...installation, app }
    })
    .filter((item) => item.app)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Installed Apps</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {installedApps.map((installation) => (
            <div key={installation.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#0b2a4a] to-[#1ad1ff] flex items-center justify-center">
                  <Image
                    src={installation.app!.icon || "/placeholder.svg"}
                    alt={`${installation.app!.name} icon`}
                    width={24}
                    height={24}
                    className="rounded"
                  />
                </div>
                <div>
                  <p className="font-medium">{installation.app!.name}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant={installation.status === "installed" ? "default" : "secondary"} className="text-xs">
                      {installation.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">v{installation.app!.version}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-1" />
                  Configure
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open App
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Uninstall</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
