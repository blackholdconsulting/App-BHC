// app/api/leads/export/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { Parser } from "json2csv";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const app_id = url.searchParams.get("app_id") ?? undefined;

  const sb = supabaseServer();
  let q = sb.from("leads").select("company_name,website,email,phone,city,province,niche,rating,reviews_count,flags,score,created_at");
  if (app_id) q = q.eq("app_id", app_id);

  const { data, error } = await q;
  if (error) return new Response(error.message, { status: 400 });

  const parser = new Parser();
  const csv = parser.parse(data ?? []);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename=leads${app_id ? "-" + app_id : ""}.csv`,
    },
  });
}
