"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const isLocal = process.env.NEXT_PUBLIC_BACKEND_URL === "http://localhost:8000";

  if (isLocal) {
    cookies().delete("access_token", {
      path: "/",
    });
    cookies().delete("refresh_token", {
      path: "/",
    });
  } else {
    cookies().delete("access_token", {
      path: "/",
      domain: process.env.NEXT_PUBLIC_DOMAIN,
    });
    cookies().delete("refresh_token", {
      path: "/",
      domain: process.env.NEXT_PUBLIC_DOMAIN,
    });
  }

  redirect("/");
}
