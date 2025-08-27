export const dynamic = "force-dynamic";
export const revalidate = 0;

import { supabaseServer } from "@/lib/supabase/server";

function Card({ title, children, right }: { title: string; children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-medium text-slate-600">{title}</div>
        {right}
      </div>
      {children}
    </div>
  );
}
function Kpi({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-1 text-3xl font-semibold">{value}</div>
    </div>
  );
}
function Sparkline({ data }: { data: number[] }) {
  if (!data.length) return <div className="h-12" />;
  const max = Math.max(...data, 1);
  const step = 100 / (data.length - 1 || 1);
  const pts = data.map((v, i) => `${i * step},${100 - (v / max) * 100}`).join(" ");
  return (
    <svg viewBox="0 0 100 100" className="h-12 w-full">
      <polyline fill="none" stroke="#0f172a" strokeWidth="3" points={pts} />
      <polyline fill="rgba(15,23,42,0.08)" stroke="none" points={`0,100 ${pts} 100,100`} />
    </svg>
  );
}
function bucketByDay(dates: string[], days = 7) {
  const end = new Date(); end.setHours(0,0,0,0);
  const b: Record<string, number> = {};
  for (let i = days - 1; i >= 0; i--) { const d = new Date(end); d.setDate(end.getDate() - i); b[d.toISOString().slice(0,10)] = 0; }
  for (const iso of dates) { const k = iso.slice(0,10); if (k in b) b[k]++; }
  return Object.values(b);
}

export default async function Dashboard() {
  const sb = supabaseServer();
  const since24h = new Date(Date.now() - 24*3600*1000).toISOString();
  const since7d  = new Date(Date.now() - 7*24*3600*1000).toISOString();

  // KPIs
  const [{ count: appsKpi }, { count: tasksKpi }, { count: hooksKpi }, { count: leads24h }] = await Promise.all([
    sb.from("apps").select("*", { count: "exact", head: true }),
    sb.from("tasks").select("*", { count: "exact", head: true }),
    sb.from("webhooks").select("*", { count: "exact", head: true }),
    sb.from("leads").select("*", { count: "exact", head: true }).gte("created_at", since24h),
  ]);

  // Lists
  const { data: apps = [] } = await sb.from("apps").select("id,name,slug,catalog_key,created_at,status").order("created_at", { ascending:false }).limit(5);
  const [{ data: runs = [] }, { data: hookEvents = [] }] = await Promise.all([
    sb.from("task_runs").select("id,status,started_at,finished_at,items_processed").order("started_at", { ascending:false }).limit(6),
    sb.from("webhook_events").select("id,received_at").order("received_at", { ascending:false }).limit(6),
  ]);
  const [{ data: leads7raw = [] }, { data: latestLeads = [] }] = await Promise.all([
    sb.from("leads").select("created_at").gte("created_at", since7d).order("created_at", { ascending:true }),
    sb.from("leads").select("company_name,website,city,created_at,score,flags").order("created_at", { ascending:false }).limit(6),
  ]);
  const leads7 = bucketByDay(leads7raw.map(l=>l.created_at), 7);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-slate-500">Welcome to your BlackHold App Hub</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Installed Apps" value={appsKpi ?? 0} />
        <Kpi label="Active Tasks" value={tasksKpi ?? 0} />
        <Kpi label="Webhooks" value={hooksKpi ?? 0} />
        <Kpi label="New Leads (24h)" value={leads24h ?? 0} />
      </div>

      {/* Tres columnas */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card title="Installed Apps" right={<a href="/apps" className="text-sm text-slate-500 underline">View all</a>}>
          {apps.length === 0 ? <div className="text-sm text-slate-500">No apps installed yet.</div> : (
            <ul className="divide-y">
              {apps.map((a) => (
                <li key={a.id} className="py-2 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{a.name}</div>
                    <div className="text-xs text-slate-500">{a.catalog_key} · {a.slug}</div>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">{a.status}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Recent Activity">
          {runs.length === 0 && hookEvents.length === 0 ? (
            <div className="text-sm text-slate-500">There is no activity yet.</div>
          ) : (
            <ul className="space-y-2">
              {runs.slice(0,3).map((r) => (
                <li key={r.id} className="rounded-lg border p-3">
                  <div className="text-sm font-medium">Task run · {r.status}</div>
                  <div className="text-xs text-slate-500">
                    Started {new Date(r.started_at).toLocaleString()} · Items {r.items_processed ?? 0}
                  </div>
                </li>
              ))}
              {hookEvents.slice(0,3).map((e) => (
                <li key={e.id} className="rounded-lg border p-3">
                  <div className="text-sm font-medium">Webhook event</div>
                  <div className="text-xs text-slate-500">Received {new Date(e.received_at).toLocaleString()}</div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Leads – last 7 days" right={<a href="/leads" className="text-sm text-slate-500 underline">Open</a>}>
          <Sparkline data={leads7} />
          <div className="mt-2 text-xs text-slate-500">{leads7.reduce((a,b)=>a+b,0)} leads in the last 7 days</div>
        </Card>
      </div>

      {/* Últimos leads */}
      <Card title="Latest Leads" right={<a href="/leads" className="text-sm text-slate-500 underline">View all</a>}>
        {latestLeads.length === 0 ? (
          <div className="text-sm text-slate-500">No leads yet. Connect a webhook or install a scraping app.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="text-left p-2">Company</th>
                  <th className="text-left p-2">Website</th>
                  <th className="text-left p-2">City</th>
                  <th className="text-left p-2">Score</th>
                  <th className="text-left p-2">Flags</th>
                  <th className="text-left p-2">Created</th>
                </tr>
              </thead>
              <tbody>
                {latestLeads.map((l, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2">{l.company_name ?? "—"}</td>
                    <td className="p-2">
                      {l.website ? <a href={l.website} target="_blank" className="underline">{l.website.replace(/^https?:\/\//,"")}</a> : "—"}
                    </td>
                    <td className="p-2">{l.city ?? "—"}</td>
                    <td className="p-2">{l.score ?? 0}</td>
                    <td className="p-2">
                      {Array.isArray(l.flags) && l.flags.length ? (
                        <div className="flex flex-wrap gap-1">
                          {l.flags.map((f:string, k:number)=>(
                            <span key={k} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">{f}</span>
                          ))}
                        </div>
                      ) : "—"}
                    </td>
                    <td className="p-2">{new Date(l.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
