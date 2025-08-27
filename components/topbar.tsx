// components/topbar.tsx
import Link from "next/link";
import { Button } from "@/components/ui";

export function Topbar() {
  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-4">
      <div className="font-medium">BlackHold App Hub</div>
      <div className="flex items-center gap-2">
        <Link href="/api/leads/export">
          <Button className="bg-slate-900">Export Leads (CSV)</Button>
        </Link>
      </div>
    </header>
  );
}
