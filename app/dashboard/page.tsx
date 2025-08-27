// app/(app)/dashboard/page.tsx
import { supabaseServer } from "@/lib/supabase/server";
import { KpiCard } from "@/components/kpi-card";

export default async function Dashboard() {
  const sb = supabaseServer();
  const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();

  const [{ count: apps }, { count: tasks }, { count: hooks }, { count: newLeads }] = await Promise.all([
    sb.from("apps").select("*", { count: "exact", head: true }),
    sb.from("tasks").select("*", { count: "exact", head: true }),
    sb.from("webhooks").select("*", { count: "exact", head: true }),
    sb.from("leads").select("*", { count: "exact", head: true }).gte("created_at", since),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Installed Apps" value={apps ?? 0} />
        <KpiCard title="Active Tasks" value={tasks ?? 0} />
        <KpiCard title="Webhooks" value={hooks ?? 0} />
        <KpiCard title="New Leads (24h)" value={newLeads ?? 0} />
      </div>
    </div>
  );
}
