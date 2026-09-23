import { NextResponse } from "next/server";
import { mockPrestasi } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ success: true, data: mockPrestasi });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json(
      {
        success: true,
        data: { id: `pres_${Date.now()}`, isVerified: false, ...body },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request payload" }, { status: 400 });
  }
}
