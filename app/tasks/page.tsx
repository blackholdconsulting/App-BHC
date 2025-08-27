import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { TaskManagement } from "@/components/tasks/task-management"

export default function TasksPage() {
  return (
    <DashboardLayout title="Task Management" subtitle="Schedule and monitor automated tasks">
      <TaskManagement />
    </DashboardLayout>
  )
}
