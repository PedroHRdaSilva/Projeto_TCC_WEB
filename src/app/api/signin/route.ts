import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const token = body.credentials?.accessToken;

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 });
  }
  const expires = new Date(Date.now() + 1814400000);
  const res = NextResponse.json({ success: true });
  res.cookies.set("accessToken", token, {
    expires,
    sameSite: "strict",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}
