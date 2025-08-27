// components/nav.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/components/utils";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/catalog", label: "App Catalog" },
  { href: "/apps", label: "Installed Apps" },
  { href: "/tasks", label: "Task Management" },
  { href: "/webhooks", label: "Webhooks" },
  { href: "/leads", label: "Lead Management" },
  { href: "/settings", label: "Settings" },
];

export function Nav() {
  const path = usePathname();
  return (
    <nav className="p-2">
      {links.map((l) => {
        const active = path === l.href || path?.startsWith(l.href + "/");
        return (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "block px-3 py-2 rounded-md text-sm",
              active ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
            )}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}

// util mínima
export function cn(...cls: Array<string | false | null | undefined>) {
  return cls.filter(Boolean).join(" ");
}
