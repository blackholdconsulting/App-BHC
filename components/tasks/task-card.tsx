"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Clock, Play, Pause, MoreHorizontal, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import type { Task } from "@/lib/types"
import { mockApps } from "@/lib/mock-data"

interface TaskCardProps {
  task: Task
  onRun: (taskId: string) => void
  onPause: (taskId: string) => void
  onDelete: (taskId: string) => void
}

export function TaskCard({ task, onRun, onPause, onDelete }: TaskCardProps) {
  const app = mockApps.find((a) => a.id === task.app_id)

  const getStatusIcon = () => {
    switch (task.status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "running":
        return <div className="h-4 w-4 rounded-full bg-blue-600 animate-pulse" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = () => {
    switch (task.status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "running":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg text-balance">{task.name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1 text-pretty">{task.description}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {task.status === "pending" && (
                <DropdownMenuItem onClick={() => onRun(task.id)}>
                  <Play className="mr-2 h-4 w-4" />
                  Run Now
                </DropdownMenuItem>
              )}
              {task.status === "running" && (
                <DropdownMenuItem onClick={() => onPause(task.id)}>
                  <Pause className="mr-2 h-4 w-4" />
                  Pause
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>Edit Task</DropdownMenuItem>
              <DropdownMenuItem>View Logs</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-red-600">
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <Badge className={getStatusColor()}>{task.status}</Badge>
          </div>
          {app && <span className="text-sm text-muted-foreground">{app.name}</span>}
        </div>

        {task.status === "running" && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>75%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Scheduled:</span>
            <p className="font-medium">{formatDate(task.scheduled_at)}</p>
          </div>
          {task.completed_at && (
            <div>
              <span className="text-muted-foreground">Completed:</span>
              <p className="font-medium">{formatDate(task.completed_at)}</p>
            </div>
          )}
        </div>

        {task.result && (
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-sm font-medium text-green-800">Result:</p>
            <p className="text-sm text-green-700">
              Processed: {task.result.processed}, Errors: {task.result.errors}
            </p>
          </div>
        )}

        {task.error && (
          <div className="p-3 bg-red-50 rounded-lg">
            <p className="text-sm font-medium text-red-800">Error:</p>
            <p className="text-sm text-red-700">{task.error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
