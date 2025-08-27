import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const sb = supabaseServer();

  // Busca el webhook por path
  const path = `/api/hooks/${params.slug}`;
  const { data: hook } = await sb.from("webhooks").select("*").eq("path", path).maybeSingle();
  if (!hook || !hook.enabled) return NextResponse.json({ ok: false, error: "hook not found" }, { status: 404 });

  const payload = await req.json();

  // (Opcional) verifica firma HMAC si la envías en 'x-bhc-signature'

  // Guarda el evento crudo para depurar
  await sb.from("webhook_events").insert({
    webhook_id: hook.id,
    headers: Object.fromEntries(req.headers),
    payload
  });

  // Si viene leads[], los inserta/upserta
  const leads = Array.isArray(payload.leads) ? payload.leads : [];
  if (leads.length) {
    const rows = leads.map((l: any) => ({
      app_id: hook.app_id,
      source: l.source ?? 'webhook',
      company_name: l.company_name ?? null,
      website: l.website ?? null,
      email: l.email ?? null,
      phone: l.phone ?? null,
      city: l.city ?? null,
      province: l.province ?? null,
      niche: l.niche ?? null,
      rating: l.rating ?? null,
      reviews_count: l.reviews_count ?? null,
      flags: l.flags ?? null,
      score: l.score ?? 0,
      metadata: l.metadata ?? {}
    }));

    // upsert por website + company_name si hay
    await sb.from("leads").upsert(rows, { ignoreDuplicates: false, onConflict: "website" });
  }

  return NextResponse.json({ ok: true, inserted: leads.length });
}
