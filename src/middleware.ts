import { NextRequest, NextResponse } from "next/server";
import APP_PATH from "./constants/app-path";

function checkIfStringStartsWith(str: string, arr: string[]) {
	return arr.some((substr) => str.startsWith(substr));
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	console.log("pathname: ", pathname);

	if (pathname === "/") {
		return NextResponse.redirect(new URL(APP_PATH.DASHBOARD, request.url));
	}

	const cookie = request.cookies.get("Authorization");
	console.log("cookie: ", cookie);
	const authPage = [APP_PATH.ONBOARDING, APP_PATH.PAYMENT, APP_PATH.DASHBOARD];

	if (!cookie && checkIfStringStartsWith(pathname, authPage)) {
		return NextResponse.redirect(new URL(APP_PATH.SIGN_IN, request.url));
	} else if (cookie && !checkIfStringStartsWith(pathname, authPage)) {
		return NextResponse.redirect(new URL(APP_PATH.DASHBOARD, request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
};
