import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabase/server";

const Body = z.object({
  app_id: z.string(),
  name: z.string(),
  cron: z.string(),
  config: z.record(z.any()).optional()
});

export async function POST(req: NextRequest) {
  const body = Body.parse(await req.json());
  const sb = supabaseServer();
  const { error } = await sb.from("tasks").insert({
    app_id: body.app_id,
    name: body.name,
    cron: body.cron,
    config: body.config ?? {}
  });
  if (error) return NextResponse.json({ ok: false, error }, { status: 400 });
  return NextResponse.json({ ok: true });
}
