"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CheckCircle, AlertCircle, Clock, Download } from "lucide-react"

export function RecentActivity() {
  // Combine different types of activities
  const activities = [
    {
      id: "1",
      type: "task_completed",
      title: "Daily Lead Sync completed",
      description: "Processed 15 leads successfully",
      timestamp: "2 minutes ago",
      icon: CheckCircle,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: "2",
      type: "app_installed",
      title: "Lead Capture Pro installed",
      description: "Successfully configured and deployed",
      timestamp: "1 hour ago",
      icon: Download,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "3",
      type: "task_scheduled",
      title: "Weekly Report Generation scheduled",
      description: "Will run on March 25, 2024 at 10:00 AM",
      timestamp: "3 hours ago",
      icon: Calendar,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: "4",
      type: "task_failed",
      title: "Email sync task failed",
      description: "Connection timeout - will retry in 1 hour",
      timestamp: "5 hours ago",
      icon: AlertCircle,
      iconColor: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      id: "5",
      type: "task_pending",
      title: "Database backup pending",
      description: "Waiting for maintenance window",
      timestamp: "1 day ago",
      icon: Clock,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${activity.bgColor} flex-shrink-0`}>
                <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
