import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

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

    const record = await db.partnershipEnquiry.create({
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
      { ok: false, error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
