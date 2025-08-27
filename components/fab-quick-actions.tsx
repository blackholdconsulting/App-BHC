"use client";
import Link from "next/link";
import { Plus, Download, Globe, Webhook } from "lucide-react";
import { useState } from "react";

export function FabQuickActions() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-2 rounded-xl border bg-white shadow-lg overflow-hidden">
          <Link href="/catalog" className="flex items-center gap-2 px-4 py-3 hover:bg-slate-50 text-sm">
            <Globe className="size-4" /> Install App
          </Link>
          <Link href="/api/leads/export" className="flex items-center gap-2 px-4 py-3 hover:bg-slate-50 text-sm">
            <Download className="size-4" /> Export Leads CSV
          </Link>
          <Link href="/webhooks" className="flex items-center gap-2 px-4 py-3 hover:bg-slate-50 text-sm">
            <Webhook className="size-4" /> Create Webhook
          </Link>
        </div>
      )}
      <button
        onClick={() => setOpen(v=>!v)}
        className="size-12 grid place-items-center rounded-full bg-slate-900 text-white shadow-lg hover:bg-slate-800"
        aria-label="Quick actions"
      >
        <Plus className={`size-6 transition ${open ? "rotate-45" : ""}`} />
      </button>
    </div>
  );
}
