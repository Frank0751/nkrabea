import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

const VALID_TYPES = ["performance", "workshop", "residency", "festival", "corporate"];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = (body?.name ?? "").toString().trim();
    const email = (body?.email ?? "").toString().trim().toLowerCase();
    const phone = (body?.phone ?? "").toString().trim();
    const eventType = (body?.eventType ?? "performance").toString().trim();
    const date = (body?.date ?? "").toString().trim() || null;
    const message = (body?.message ?? "").toString().trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Name, email and message are required." },
        { status: 400 }
      );
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    const finalType = VALID_TYPES.includes(eventType) ? eventType : "performance";

    const record = await db.bookingRequest.create({
      data: { name, email, phone, eventType: finalType, date, message },
    });

    return NextResponse.json({
      ok: true,
      id: record.id,
      message: "Booking request received. Our producer will reply with availability and rates.",
    });
  } catch (err) {
    console.error("booking route error", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
