import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import routes from "@/utils/routes";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");

  return NextResponse.redirect(new URL(routes.landing, request.url));
}
