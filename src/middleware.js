// src/middleware.js
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const accessToken = request.cookies.get("access_token");
  const refreshToken = request.cookies.get("refresh_token");

  const isLocal = process.env.NEXT_PUBLIC_BACKEND_URL === "http://localhost:8000";

  // Only run this middleware for the home page
  if (request.nextUrl.pathname === "/") {
    // If both tokens exist, redirect to /uniboard
    if (accessToken?.value && refreshToken?.value) {
      return NextResponse.redirect(new URL("/uniboard/home", request.url));
    } else {
      // If no tokens, allow the user to proceed to the home page
      return NextResponse.next();
    }
  }

  if (!accessToken || !refreshToken) {
    // No access token or refresh token, redirect to home
    const response = NextResponse.redirect(new URL("/", request.url));

    // Delete cookies based on environment
    if (isLocal) {
      response.cookies.delete("access_token");
      response.cookies.delete("refresh_token");
    } else {
      response.cookies.delete("access_token", {
        path: "/",
        domain: process.env.NEXT_PUBLIC_DOMAIN,
      });
      response.cookies.delete("refresh_token", {
        path: "/",
        domain: process.env.NEXT_PUBLIC_DOMAIN,
      });
    }
    return response;
  }

  let decodedToken;
  try {
    // Decode the access token to get the payload
    decodedToken = jwt.decode(accessToken.value, process.env.JWT_SECRET);
  } catch (error) {
    console.log("Failed to decode token:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const timeRemaining = decodedToken.exp - currentTime;

  // Check if the token is valid for more than 2 minutes
  if (timeRemaining > 120) {
    return NextResponse.next();
  }

  // Token is about to expire, refresh it
  const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshToken.value }),
  });

  if (!refreshResponse.ok) {
    const response = NextResponse.redirect(new URL("/", request.url));

    // Delete cookies based on environment
    if (isLocal) {
      response.cookies.delete("access_token");
      response.cookies.delete("refresh_token");
    } else {
      response.cookies.delete("access_token", {
        path: "/",
        domain: process.env.NEXT_PUBLIC_DOMAIN,
      });
      response.cookies.delete("refresh_token", {
        path: "/",
        domain: process.env.NEXT_PUBLIC_DOMAIN,
      });
    }

    return response;
  } else {
    const refreshData = await refreshResponse.json();
    const newAccessToken = refreshData.access;
    const newRefreshToken = refreshData.refresh;

    const newHeaders = new Headers(request.headers);
    const newCookie = newHeaders
      .get("cookie")
      ?.split("; ")
      .map(ck => {
        const [key, value] = ck.split("=");
        return `${key}=${key === "access_token" ? newAccessToken : key === "refresh_token" ? newRefreshToken : value}`;
      })
      .join("; ");

    if (newCookie) {
      newHeaders.set("cookie", newCookie);
    }

    const response = NextResponse.next({
      request: { headers: newHeaders },
    });

    // Set cookies based on environment
    if (isLocal) {
      response.cookies.set("access_token", newAccessToken, {
        path: "/",
        httpOnly: true,
      });
      response.cookies.set("refresh_token", newRefreshToken, {
        path: "/",
        httpOnly: true,
      });
    } else {
      response.cookies.set("access_token", newAccessToken, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "None",
        domain: process.env.NEXT_PUBLIC_DOMAIN,
      });
      response.cookies.set("refresh_token", newRefreshToken, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "None",
        domain: process.env.NEXT_PUBLIC_DOMAIN,
      });
    }

    return response;
  }
}

export const config = {
  matcher: ["/uniboard/:path*", "/api/:path*", "/"],
};
