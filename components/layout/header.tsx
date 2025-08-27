"use client";
import Link from "next/link";
import { Plus, Bell, HelpCircle, Search } from "lucide-react";

export function Header() {
  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-4">
      <div className="font-semibold">BlackHold App Hub</div>

      <div className="hidden md:flex items-center gap-2 w-[480px]">
        <div className="relative flex-1">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full rounded-lg border px-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
            placeholder="Search..."
          />
        </div>
        <Link href="/catalog" className="inline-flex items-center gap-2 rounded-lg bg-slate-900 text-white text-sm px-3 py-2">
          <Plus className="size-4" /> Quick Actions
        </Link>
        <button className="p-2 rounded-lg border hover:bg-slate-50" aria-label="Notifications">
          <Bell className="size-4" />
        </button>
        <a href="https://docs.blackholdconsulting.com" target="_blank" className="p-2 rounded-lg border hover:bg-slate-50" aria-label="Help">
          <HelpCircle className="size-4" />
        </a>
      </div>
    </header>
  );
}
