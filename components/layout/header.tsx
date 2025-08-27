"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Bell, Plus, HelpCircle } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

interface HeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export function Header({ title, subtitle, actions }: HeaderProps) {
  const user = getCurrentUser()

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 text-balance">{title}</h1>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search..." className="pl-10 w-64" />
          </div>

          {/* Quick Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="bg-[#0b2a4a] hover:bg-[#0b2a4a]/90">
                <Plus className="h-4 w-4 mr-2" />
                Quick Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Install New App</DropdownMenuItem>
              <DropdownMenuItem>Create Task</DropdownMenuItem>
              <DropdownMenuItem>Add Webhook</DropdownMenuItem>
              <DropdownMenuItem>Import Leads</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="relative bg-transparent">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-3 border-b">
                <h3 className="font-semibold">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <DropdownMenuItem className="flex-col items-start p-3">
                  <div className="font-medium">Task Completed</div>
                  <div className="text-sm text-muted-foreground">Daily Lead Sync finished successfully</div>
                  <div className="text-xs text-muted-foreground mt-1">2 minutes ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex-col items-start p-3">
                  <div className="font-medium">New App Available</div>
                  <div className="text-sm text-muted-foreground">Analytics Pro v2.0 is now available</div>
                  <div className="text-xs text-muted-foreground mt-1">1 hour ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex-col items-start p-3">
                  <div className="font-medium">Webhook Error</div>
                  <div className="text-sm text-muted-foreground">Lead capture webhook failed to deliver</div>
                  <div className="text-xs text-muted-foreground mt-1">3 hours ago</div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Help */}
          <Button variant="outline" size="sm">
            <HelpCircle className="h-4 w-4" />
          </Button>

          {/* Custom Actions */}
          {actions}
        </div>
      </div>
    </header>
  )
}
