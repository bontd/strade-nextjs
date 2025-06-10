import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import nookies from "nookies";

const defaultLocale = "vi";
export const locales = ["vi", "en"];

// Get the preferred locale, similar to above or using a library
// function getLocale(request: NextRequest) {
//   const acceptedLanguage = request.headers.get("accept-language") ?? undefined;
//   let headers = { "accept-language": acceptedLanguage };
//   let languages = new Negotiator({ headers }).languages();
//   return match(languages, locales, defaultLocale);
// }

export async function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  if (pathname.includes("/login")) {
    nookies.destroy(null, "token");
  }
  const {
    nextUrl: { search },
  } = request;
  const urlSearchParams = new URLSearchParams(search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const urlParams = "?" + new URLSearchParams(params);
  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );
  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // e.g. incoming request is /product-list
    // The new URL is now /en-US/product-list
    return NextResponse.redirect(
      new URL(
        `/${defaultLocale}${pathname.startsWith("/") ? "" : "/"}${pathname}${urlParams}`,
        request.url,
      ),
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, api)
    "/((?!api|assets|.*\\..*|_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
