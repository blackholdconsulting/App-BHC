// components/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/components/ui";
import { LayoutGrid, Package, ListChecks, Webhook, UsersRound, Settings, Menu } from "lucide-react";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/catalog", label: "App Catalog", icon: Package },
  { href: "/apps", label: "Installed Apps", icon: Package },
  { href: "/tasks", label: "Task Management", icon: ListChecks },
  { href: "/webhooks", label: "Webhooks", icon: Webhook },
  { href: "/leads", label: "Lead Management", icon: UsersRound },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const path = usePathname();
  const [open, setOpen] = useState(true);

  return (
    <aside className={cn(
      "border-r bg-white transition-all duration-200 ease-in-out",
      open ? "w-64" : "w-16"
    )}>
      {/* Header + toggle */}
      <div className="h-14 border-b flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-slate-900 text-white grid place-items-center font-bold">BH</div>
          {open && <span className="font-semibold">App Hub</span>}
        </div>
        <button
          className="p-2 rounded-md hover:bg-slate-100"
          aria-label="Toggle menu"
          onClick={() => setOpen(v => !v)}
        >
          <Menu className="size-5" />
        </button>
      </div>

      {/* Nav */}
      <nav className="p-2 space-y-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active = path === href || path?.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                active
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              )}
              title={!open ? label : undefined}
            >
              <Icon className="size-4 shrink-0" />
              {open && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto p-3 text-[11px] text-slate-500">
        {open ? "© BlackHold Consulting" : "© BHC"}
      </div>
    </aside>
  );
}
