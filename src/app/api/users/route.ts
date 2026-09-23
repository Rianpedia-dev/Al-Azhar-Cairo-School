// src/app/api/users/route.ts per PRD 8.2
import { NextResponse } from "next/server";
import { mockUsers } from "@/lib/mock-data";
import { validateUserInput } from "@/lib/validators/user";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  let filtered = [...mockUsers];

  if (role && role !== "ALL") {
    filtered = filtered.filter((u) => u.role === role);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.nomorInduk && u.nomorInduk.toLowerCase().includes(q))
    );
  }

  const total = filtered.length;
  const startIndex = (page - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    success: true,
    data: paginated,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateUserInput(body);

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name: body.name,
      email: body.email,
      role: body.role,
      nomorInduk: body.nomorInduk || null,
      phone: body.phone || null,
      alamat: body.alamat || null,
      jenjangId: body.jenjangId || null,
      kelasId: body.kelasId || null,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Format request tidak valid" },
      { status: 400 }
    );
  }
}
