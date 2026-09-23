import { NextResponse } from "next/server";
import { mockMataPelajaran } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ success: true, data: mockMataPelajaran });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ success: true, data: { id: `mp_${Date.now()}`, ...body } }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request payload" }, { status: 400 });
  }
}
