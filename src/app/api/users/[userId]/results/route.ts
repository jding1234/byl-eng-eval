import { NextRequest, NextResponse } from "next/server";
import { getUserResults } from "@/lib/data/users";
import { isUserId } from "@/lib/types";

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ userId: string }> }

) { 
  const { userId } = await ctx.params;

  if (!userId || !isUserId(userId)) {
    return NextResponse.json(
      { ok: false, error: "Missing or invalid userId"},
      { status: 400 }
    );
  }

  const results = getUserResults(userId);
  if (!results) {
    return NextResponse.json(
      { ok: false, error: "Results not found", userId },
      { status: 404}
    );
  }

  return NextResponse.json({ ok: true, userId, results }, { status: 200 });
}