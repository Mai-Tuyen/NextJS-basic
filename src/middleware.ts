import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  //   return NextResponse.redirect(new URL("/", request.url));
  //   -----------------
  //   const response = NextResponse.next();
  //   response.cookies.set("name", "John Doe", {
  //     path: "/",
  //     httpOnly: true,
  //     secure: true,
  //     maxAge: 60 * 60 * 24 * 30,
  //   });
  //   return response;
  // ------------------------------
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/introduce")) {
    return NextResponse.rewrite(new URL("/about", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  //   matcher: ["/admin/:path*", "/order/:path*"], // chỉ gọi middleware khi route thuộc những path này
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
