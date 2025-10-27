import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";

let defaultLocale = "en";
let locales = ["en", "de"];

function getLocale(request) {
    const acceptedLanguage =
        request.headers.get("accept-language") ?? undefined;
    const headers = { "accept-language": acceptedLanguage };
    const languages = new Negotiator({ headers }).languages();
    return match(languages, locales, defaultLocale);
}

export function middleware(request) {
    const pathname = request.nextUrl.pathname;

    // Check if pathname already has a locale
    const pathnameHasLocale = locales.some(
        (locale) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        // If URL has /en prefix, redirect to remove it
        if (pathname.startsWith(`/${defaultLocale}/`)) {
            const newPathname =
                pathname.replace(`/${defaultLocale}`, "") || "/";
            return NextResponse.redirect(new URL(newPathname, request.url));
        }
        if (pathname === `/${defaultLocale}`) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        // For /de URLs, continue normally
        return NextResponse.next();
    }

    // No locale in pathname - rewrite to /en internally
    return NextResponse.rewrite(
        new URL(`/${defaultLocale}${pathname}`, request.url)
    );
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|icons).*)"],
};
