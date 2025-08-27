"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Grid, List } from "lucide-react"
import { AppCard } from "./app-card"
import { AppDetailsModal } from "./app-details-modal"
import { InstallationWizard } from "./installation-wizard"
import { mockApps, mockInstallations } from "@/lib/mock-data"
import type { App } from "@/lib/types"

export function AppCatalog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedApp, setSelectedApp] = useState<App | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [showInstallWizard, setShowInstallWizard] = useState(false)

  const categories = useMemo(() => {
    const cats = Array.from(new Set(mockApps.map((app) => app.category)))
    return ["all", ...cats]
  }, [])

  const filteredApps = useMemo(() => {
    return mockApps.filter((app) => {
      const matchesSearch =
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || app.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const isAppInstalled = (appId: string) => {
    return mockInstallations.some((installation) => installation.app_id === appId)
  }

  const handleViewDetails = (appId: string) => {
    const app = mockApps.find((a) => a.id === appId)
    if (app) {
      setSelectedApp(app)
      setShowDetails(true)
    }
  }

  const handleInstall = (appId: string) => {
    const app = mockApps.find((a) => a.id === appId)
    if (app && !isAppInstalled(appId)) {
      setSelectedApp(app)
      setShowInstallWizard(true)
    }
  }

  const handleInstallComplete = (appId: string, config: Record<string, any>) => {
    console.log("[v0] App installed:", appId, config)
    // In a real app, this would create a new installation record
    setShowInstallWizard(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search apps, features, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-balance">App Catalog</h2>
          <p className="text-muted-foreground">
            {filteredApps.length} {filteredApps.length === 1 ? "app" : "apps"} available
          </p>
        </div>
        <div className="flex gap-2">
          {categories.slice(1).map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <div
        className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
      >
        {filteredApps.map((app) => (
          <AppCard
            key={app.id}
            app={app}
            onInstall={handleInstall}
            onViewDetails={handleViewDetails}
            isInstalled={isAppInstalled(app.id)}
          />
        ))}
      </div>

      {filteredApps.length === 0 && (
        <div className="text-center py-12">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No apps found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}

      <AppDetailsModal
        app={selectedApp}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        onInstall={handleInstall}
        isInstalled={selectedApp ? isAppInstalled(selectedApp.id) : false}
      />

      <InstallationWizard
        app={selectedApp}
        isOpen={showInstallWizard}
        onClose={() => setShowInstallWizard(false)}
        onComplete={handleInstallComplete}
      />
    </div>
  )
}
