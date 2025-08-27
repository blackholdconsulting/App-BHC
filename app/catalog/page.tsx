// app/(app)/catalog/page.tsx
import { supabaseServer } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Catalog() {
  const sb = supabaseServer();
  const { data: apps } = await sb.from("app_catalog").select("*").order("name");
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">App Catalog</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(apps ?? []).map((a) => (
          <div key={a.key} className="rounded-xl border bg-white p-4 flex flex-col">
            <div className="text-lg font-semibold">{a.name}</div>
            <div className="text-xs text-slate-500">{a.category}</div>
            <p className="text-sm mt-3 flex-1">{a.short_description}</p>
            <div className="mt-4 flex gap-2">
              <Link href={`/apps/new?from=${a.key}`} className="px-3 py-2 rounded-md bg-slate-900 text-white text-sm">
                Install
              </Link>
              {a.docs_url && (
                <a href={a.docs_url} target="_blank" className="text-sm underline text-slate-600">
                  Docs
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
