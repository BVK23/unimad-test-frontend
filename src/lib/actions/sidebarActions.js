"use server";

import { cookies } from "next/headers";

export async function fetchDashboardData() {
  try {
    const cookieStore = cookies();
    const accessTokenCookie = cookieStore.get("access_token");

    if (!accessTokenCookie) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-sidebar-checkpoint/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessTokenCookie.value}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error || "Failed to sidebar data");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error sidebar data:", error.message);
    throw error;
  }
}
