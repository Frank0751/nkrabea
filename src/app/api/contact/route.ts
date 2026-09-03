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

const VALID_INTENTS = [
  "general",
  "partnership",
  "programme",
  "volunteer",
  "media",
];

export async function POST(req: NextRequest) {
  if (!PERSISTENCE_IS_DURABLE) {
    console.error("contact route: persistence unavailable.", PERSISTENCE_DIAGNOSIS);
    return NextResponse.json(unavailableResponse(ORG.email), { status: 503 });
  }

  try {
    const body = await req.json();

    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "")
      .trim()
      .toLowerCase();
    const subject = String(body?.subject ?? "General Enquiry").trim();
    const message = String(body?.message ?? "").trim();
    const intent = String(body?.intent ?? "general").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Name, email and message are required." },
        { status: 400 }
      );
    }
    if (!EMAIL.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const record = await getDb().contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
        intent: VALID_INTENTS.includes(intent) ? intent : "general",
      },
    });

    return NextResponse.json({
      ok: true,
      id: record.id,
      message:
        "Your message has been received. We aim to respond within three working days.",
    });
  } catch (err) {
    console.error("contact route error", err);
    return NextResponse.json(
      {
        ok: false,
        error: `We could not record your message. Please email ${ORG.email} directly.`,
      },
      { status: 500 }
    );
  }
}
