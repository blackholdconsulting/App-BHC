import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { WebhookManagement } from "@/components/webhooks/webhook-management"

export default function WebhooksPage() {
  return (
    <DashboardLayout title="Webhook Management" subtitle="Manage webhook endpoints and monitor deliveries">
      <WebhookManagement />
    </DashboardLayout>
  )
}
