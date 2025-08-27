"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, RefreshCw } from "lucide-react"
import { TaskCard } from "./task-card"
import { CreateTaskDialog } from "./create-task-dialog"
import { TaskFilters } from "./task-filters"
import { mockTasks } from "@/lib/mock-data"
import type { Task } from "@/lib/types"

export function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [appFilter, setAppFilter] = useState("all")

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "all" || task.status === statusFilter
      const matchesApp = appFilter === "all" || task.app_id === appFilter

      return matchesSearch && matchesStatus && matchesApp
    })
  }, [tasks, searchQuery, statusFilter, appFilter])

  const handleCreateTask = (newTask: Omit<Task, "id">) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
    }
    setTasks((prev) => [task, ...prev])
  }

  const handleRunTask = (taskId: string) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, status: "running" as const } : task)))

    // Simulate task completion after 3 seconds
    setTimeout(() => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId
            ? {
                ...task,
                status: "completed" as const,
                completed_at: new Date().toISOString(),
                result: { processed: Math.floor(Math.random() * 20) + 5, errors: 0 },
              }
            : task,
        ),
      )
    }, 3000)
  }

  const handlePauseTask = (taskId: string) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, status: "pending" as const } : task)))
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  const handleRefresh = () => {
    // Simulate refreshing task status
    console.log("[v0] Refreshing task status...")
  }

  const handleClearFilters = () => {
    setStatusFilter("all")
    setAppFilter("all")
    setSearchQuery("")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <CreateTaskDialog onCreateTask={handleCreateTask} />
        </div>
      </div>

      <TaskFilters
        statusFilter={statusFilter}
        appFilter={appFilter}
        onStatusFilterChange={setStatusFilter}
        onAppFilterChange={setAppFilter}
        onClearFilters={handleClearFilters}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onRun={handleRunTask}
            onPause={handlePauseTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}
