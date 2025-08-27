"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Filter, X } from "lucide-react"
import { mockApps } from "@/lib/mock-data"

interface TaskFiltersProps {
  statusFilter: string
  appFilter: string
  onStatusFilterChange: (status: string) => void
  onAppFilterChange: (appId: string) => void
  onClearFilters: () => void
}

export function TaskFilters({
  statusFilter,
  appFilter,
  onStatusFilterChange,
  onAppFilterChange,
  onClearFilters,
}: TaskFiltersProps) {
  const hasActiveFilters = statusFilter !== "all" || appFilter !== "all"

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Filters:</span>
      </div>

      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="running">Running</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="failed">Failed</SelectItem>
        </SelectContent>
      </Select>

      <Select value={appFilter} onValueChange={onAppFilterChange}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Apps</SelectItem>
          {mockApps.map((app) => (
            <SelectItem key={app.id} value={app.id}>
              {app.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button variant="outline" size="sm" onClick={onClearFilters}>
          <X className="h-4 w-4 mr-1" />
          Clear Filters
        </Button>
      )}

      <div className="flex gap-2 ml-auto">
        <Badge variant="outline">Pending: 2</Badge>
        <Badge variant="outline">Running: 0</Badge>
        <Badge variant="outline">Completed: 1</Badge>
        <Badge variant="outline">Failed: 0</Badge>
      </div>
    </div>
  )
}
