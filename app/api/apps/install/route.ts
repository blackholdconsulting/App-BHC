import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabase/server";

const Body = z.object({
  catalog_key: z.string(),
  name: z.string().min(2),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  secrets: z.record(z.string()).optional(),  // { GOOGLE_CSE_KEY: "...", ... }
  initialTasks: z.array(z.object({
    name: z.string(),
    cron: z.string(),
    config: z.record(z.any()).optional()
  })).optional()
});

export async function POST(req: NextRequest) {
  const body = Body.parse(await req.json());
  const sb = supabaseServer();

  const { data: app, error } = await sb
    .from("apps")
    .insert({
      catalog_key: body.catalog_key,
      name: body.name,
      slug: body.slug,
    })
    .select("*")
    .single();

  if (error || !app) return NextResponse.json({ ok: false, error }, { status: 400 });

  if (body.secrets && Object.keys(body.secrets).length) {
    const secrets = Object.entries(body.secrets).map(([key, value]) => ({
      app_id: app.id,
      key,
      value, // si quieres, aquí cifra con ENCRYPTION_KEY
    }));
    await sb.from("app_secrets").insert(secrets);
  }

  if (body.initialTasks?.length) {
    const rows = body.initialTasks.map(t => ({
      app_id: app.id,
      name: t.name,
      cron: t.cron,
      config: t.config ?? {}
    }));
    await sb.from("tasks").insert(rows);
  }

  return NextResponse.json({ ok: true, appId: app.id });
}
