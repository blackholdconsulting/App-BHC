"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
    <aside className={`bg-[#0b2b44] text-white transition-all duration-200 ${open ? "w-64" : "w-16"} flex flex-col`}>
      <div className="h-14 border-b border-white/10 flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-white text-[#0b2b44] grid place-items-center font-bold">BH</div>
          {open && <span className="font-semibold">App Hub</span>}
        </div>
        <button className="p-2 rounded-md hover:bg-white/10" onClick={() => setOpen(v=>!v)} aria-label="Toggle menu">
          <Menu className="size-5" />
        </button>
      </div>

      <nav className="p-2 space-y-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active = path === href || path?.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition
                ${active ? "bg-white text-[#0b2b44]" : "text-white/90 hover:bg-white/10"}`}
              title={!open ? label : undefined}
            >
              <Icon className="size-4 shrink-0" />
              {open && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-3 text-[11px] text-white/70">{open ? "© BlackHold Consulting" : "© BHC"}</div>
    </aside>
  );
}
