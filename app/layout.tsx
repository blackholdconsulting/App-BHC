// app/layout.tsx
import "@/styles/globals.css"; // <-- usa la hoja correcta de Tailwind v4
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BlackHold App Hub",
  description: "Marketplace interno de apps — BlackHold Consulting",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
