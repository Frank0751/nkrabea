import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import {
  PERSISTENCE_IS_DURABLE,
  PERSISTENCE_DIAGNOSIS,
  unavailableResponse,
} from "@/lib/persistence";
import { ORG } from "@/lib/content";

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  if (!PERSISTENCE_IS_DURABLE) {
    console.error(
      "newsletter route: persistence unavailable.",
      PERSISTENCE_DIAGNOSIS
    );
    return NextResponse.json(unavailableResponse(ORG.email), { status: 503 });
  }

  try {
    const body = await req.json();

    const name = String(body?.name ?? "").trim() || null;
    const email = String(body?.email ?? "")
      .trim()
      .toLowerCase();

    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Email is required." },
        { status: 400 }
      );
    }
    if (!EMAIL.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const record = await getDb().newsletterSubscriber.upsert({
      where: { email },
      update: { name },
      create: { email, name },
    });

    return NextResponse.json({
      ok: true,
      id: record.id,
      message:
        "You are signed up. We will write when a programme opens or completes.",
    });
  } catch (err) {
    console.error("newsletter route error", err);
    return NextResponse.json(
      {
        ok: false,
        error: `We could not sign you up. Please email ${ORG.email} directly.`,
      },
      { status: 500 }
    );
  }
}
