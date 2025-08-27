import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { InstalledApps } from "@/components/dashboard/installed-apps"

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard" subtitle="Welcome to your BlackHold App Hub">
      <div className="space-y-6">
        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />
          <InstalledApps />
        </div>
      </div>
    </DashboardLayout>
  )
}
