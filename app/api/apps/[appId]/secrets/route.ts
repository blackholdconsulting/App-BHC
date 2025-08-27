import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabase/server";

const Body = z.object({ secrets: z.record(z.string()) });

export async function POST(req: NextRequest, { params }: { params: { appId: string } }) {
  const { secrets } = Body.parse(await req.json());
  const sb = supabaseServer();

  const rows = Object.entries(secrets).map(([key, value]) => ({ app_id: params.appId, key, value }));
  // upsert por (app_id,key)
  await sb.from("app_secrets").upsert(rows, { onConflict: "app_id,key" });

  return NextResponse.json({ ok: true });
}
