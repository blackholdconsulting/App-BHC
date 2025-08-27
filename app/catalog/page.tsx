import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { AppCatalog } from "@/components/apps/app-catalog"

export default function CatalogPage() {
  return (
    <DashboardLayout title="App Catalog" subtitle="Discover and install apps to enhance your workflow">
      <AppCatalog />
    </DashboardLayout>
  )
}
