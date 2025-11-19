import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const publicRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute) {
    if (true) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  } else {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = `?from=${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configuración para el Middleware: Define qué rutas debe interceptar
export const config = {
  matcher: [
    /*
     * Rutas a interceptar, excluyendo archivos estáticos y rutas internas de Next.js
     * Usa este patrón para que coincida con todas las rutas excepto las de la API,
     * los activos estáticos y los archivos internos de Next.js
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
