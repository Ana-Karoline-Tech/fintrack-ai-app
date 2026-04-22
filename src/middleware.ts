import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import type { Session } from "@/src/lib/auth";

export default async function middleware(request: NextRequest) {
	const { data: session } = await betterFetch<Session>(
		"/api/auth/get-session",
		{
			baseURL: request.nextUrl.origin,
			headers: {
				cookie: request.headers.get("cookie") || "",
			},
		},
	);

	const isAuthPage = request.nextUrl.pathname === "/sign-in" || request.nextUrl.pathname === "/sign-up";

	if (isAuthPage) {
		if (session) {
			return NextResponse.redirect(new URL("/", request.url));
		}
		return NextResponse.next();
	}

	if (!session) {
		return NextResponse.redirect(new URL("/sign-in", request.url));
	}
	
	return NextResponse.next();
}

export const config = {
	matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png).*)",
    ],
};
