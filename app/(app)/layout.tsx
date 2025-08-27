// app/(app)/layout.tsx
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { FabQuickActions } from "@/components/fab-quick-actions";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 md:p-6">{children}</main>
      </div>

      {/* Botón flotante con accesos directos */}
      <FabQuickActions />
    </div>
  );
}
