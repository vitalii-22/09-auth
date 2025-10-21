import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { checkServerSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!accessToken) {
    if (refreshToken) {
      const data = await checkServerSession();
      const setCookie = data.headers["set-cookie"];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: Number(parsed["Max-Age"]),
          };
          if (parsed.accessToken)
            cookieStore.set("accessToken", parsed.accessToken, options);
          if (parsed.refreshToken)
            cookieStore.set("refreshToken", parsed.refreshToken, options);
        }

        if (isAuthRoute) {
          return NextResponse.redirect(new URL("/", request.url), {
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }

        if (isPrivateRoute) {
          return NextResponse.next({
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
      }
    }

    if (isAuthRoute) {
      return NextResponse.next();
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  if (isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (isPrivateRoute) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/profile/:path*", "/sign-in", "/sign-up"],
};

// import { NextRequest, NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import { checkServerSession } from "./lib/api/serverApi";
// import { parse } from "cookie";

// const privateRoutes = ["/profile"];
// const authRoutes = ["/sign-in", "/sign-up"];

// export async function middleware(request: NextRequest) {
//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get("accessToken")?.value;
//   const refreshToken = cookieStore.get("refreshToken")?.value;

//   const { pathname } = request.nextUrl;

//   const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
//   const isPrivateRoute = privateRoutes.some((route) =>
//     pathname.startsWith(route)
//   );

//   if (isPrivateRoute) {
//     if (!accessToken) {
//       if (refreshToken) {
//         const data = await checkServerSession();
//         const setCookie = data.headers["set-cookie"];

//         if (setCookie) {
//           const cookieArray = Array.isArray(setCookie)
//             ? setCookie
//             : [setCookie];
//           for (const cookieStr of cookieArray) {
//             const parsed = parse(cookieStr);
//             const options = {
//               expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
//               path: parsed.Path,
//               maxAge: Number(parsed["Max-Age"]),
//             };
//             if (parsed.accessToken)
//               cookieStore.set("accessToken", parsed.accessToken, options);
//             if (parsed.refreshToken)
//               cookieStore.set("refreshToken", parsed.refreshToken, options);
//           }
//           return NextResponse.next({
//             headers: {
//               Cookie: cookieStore.toString(),
//             },
//           });
//         }
//       }
//       return NextResponse.redirect(new URL("/sign-in", request.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/profile", "/sign-in", "/sign-up"],
// };
