import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = (body?.name ?? "").toString().trim();
    const email = (body?.email ?? "").toString().trim().toLowerCase();
    const subject = (body?.subject ?? "General Enquiry").toString().trim();
    const message = (body?.message ?? "").toString().trim();
    const intent = (body?.intent ?? "general").toString().trim();

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

    const record = await db.contactMessage.create({
      data: { name, email, subject, message, intent },
    });

    return NextResponse.json({
      ok: true,
      id: record.id,
      message: "Your message has been received. We will respond within two working days.",
    });
  } catch (err) {
    console.error("contact route error", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
