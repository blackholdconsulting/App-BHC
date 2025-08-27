// app/(app)/apps/page.tsx
import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";

export default async function MyApps() {
  const sb = supabaseServer();
  const { data, error } = await sb.from("apps").select("*").order("created_at", { ascending: false });
  if (error) return <div className="text-red-600">Error loading apps</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Installed Apps</h1>
      <div className="overflow-hidden rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Slug</th>
              <th className="text-left p-3">Catalog</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((row) => (
              <tr key={row.id} className="border-t">
                <td className="p-3">{row.name}</td>
                <td className="p-3">{row.slug}</td>
                <td className="p-3">{row.catalog_key}</td>
                <td className="p-3">{row.status}</td>
                <td className="p-3">{new Date(row.created_at).toLocaleString()}</td>
              </tr>
            ))}
            {!data?.length && (
              <tr>
                <td className="p-6 text-slate-500" colSpan={5}>
                  No apps installed yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <a
        href="/api/leads/export"
        className="inline-flex items-center px-3 py-2 rounded-md bg-slate-900 text-white text-sm"
      >
        Export Leads (CSV)
      </a>
    </div>
  );
}
