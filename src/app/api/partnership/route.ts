import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import {
  PERSISTENCE_IS_DURABLE,
  PERSISTENCE_DIAGNOSIS,
  unavailableResponse,
} from "@/lib/persistence";
import { ORG } from "@/lib/content";

export const runtime = "nodejs";

const VALID_TYPES = [
  "corporate",
  "grant",
  "government",
  "individual",
  "in-kind",
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  // Refuse before reading the body if we cannot keep what we are sent.
  if (!PERSISTENCE_IS_DURABLE) {
    console.error("partnership route: persistence unavailable.", PERSISTENCE_DIAGNOSIS);
    return NextResponse.json(unavailableResponse(ORG.email), { status: 503 });
  }

  try {
    const body = await req.json();

    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "")
      .trim()
      .toLowerCase();
    const phone = String(body?.phone ?? "").trim() || null;
    const organisation = String(body?.organisation ?? "").trim() || null;
    const partnerType = String(body?.partnerType ?? "corporate").trim();
    const programme = String(body?.programme ?? "").trim() || null;
    const message = String(body?.message ?? "").trim();

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

    const record = await getDb().partnershipEnquiry.create({
      data: {
        name,
        email,
        phone,
        organisation,
        partnerType: VALID_TYPES.includes(partnerType)
          ? partnerType
          : "corporate",
        programme,
        message,
      },
    });

    return NextResponse.json({
      ok: true,
      id: record.id,
      message:
        "Thank you. Your enquiry has reached the Executive Director, who will respond directly.",
    });
  } catch (err) {
    console.error("partnership route error", err);
    return NextResponse.json(
      {
        ok: false,
        error: `We could not record your enquiry. Please email ${ORG.email} directly.`,
      },
      { status: 500 }
    );
  }
}
