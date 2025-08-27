import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabase/server";

const Body = z.object({ app_id: z.string(), name: z.string() });

export async function POST(req: NextRequest) {
  const { app_id, name } = Body.parse(await req.json());
  const sb = supabaseServer();
  const secret = crypto.randomBytes(24).toString("hex");
  const slug = crypto.randomBytes(6).toString("hex");
  const path = `/api/hooks/${slug}`;

  const { data, error } = await sb
    .from("webhooks")
    .insert({ app_id, name, secret, path })
    .select("*")
    .single();

  if (error || !data) return NextResponse.json({ ok: false, error }, { status: 400 });

  return NextResponse.json({
    ok: true,
    webhook: {
      id: data.id,
      url: `${process.env.APP_URL}${data.path}`,
      secret: data.secret,
    }
  });
}
