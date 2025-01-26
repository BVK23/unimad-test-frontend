"use server";

import { cookies } from "next/headers";

export async function fetchChatHistory(sectionName) {
  try {
    const cookieStore = cookies();
    const accessTokenCookie = cookieStore.get("access_token");

    if (!accessTokenCookie) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/unibot-history/?sectionName=${sectionName}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessTokenCookie.value}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response is ok
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch chat history");
    }

    // Parse the JSON response
    const data = await response.json();
    return data.chat_history;
  } catch (error) {
    console.log("Error fetching chat history:", error.message);
    throw error;
  }
}

export async function fetchInitialChat(sectionName) {
  try {
    // Check if sectionName is dynamic (e.g., coverletter1, coverletter2, contentgen1, contentgen2, etc.)
    const dynamicPattern = /^(coverletter|contentgen)\d+$/;
    if (dynamicPattern.test(sectionName)) {
      return [];
    }

    const cookieStore = cookies();
    const accessTokenCookie = cookieStore.get("access_token");

    if (!accessTokenCookie) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/unibot-api/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessTokenCookie.value}`,
      },
      body: JSON.stringify({ message: "", sectionName: sectionName }),
    });

    // Check if the response is ok
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch initial chat message");
    }

    // Parse the JSON response
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.log("Error fetching Inital Chat:", error.message);
    throw error;
  }
}

export async function deleteMessage(messageId, sectionName) {
  try {
    // Get access token from cookies
    const cookieStore = cookies();
    const accessTokenCookie = cookieStore.get("access_token");

    if (!accessTokenCookie) {
      throw new Error("Unauthorized");
    }

    // Send DELETE request to the backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/unibot-delete-message/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessTokenCookie.value}`,
        },
        body: JSON.stringify({
          message_id: messageId,
          section_name: sectionName,
        }),
      }
    );

    // Check if the response is ok
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete the message");
    }

    // Return success message
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting the message:", error.message);
    throw error;
  }
}

export async function deleteSectionMessage(sectionName, deleteType = "complete") {
  try {
    // Get access token from cookies
    const cookieStore = cookies();
    const accessTokenCookie = cookieStore.get("access_token");

    if (!accessTokenCookie) {
      throw new Error("Unauthorized");
    }

    // Send DELETE request to the backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/unibot-delete-section-messages/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessTokenCookie.value}`,
        },
        body: JSON.stringify({
          section_name: sectionName,
          delete_type: deleteType,
        }),
      }
    );

    // Check if the response is ok
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete the messages for the section");
    }

    // Return success message
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting the message:", error.message);
    throw error;
  }
}

export async function fetchUnibotHomeData() {
  try {
    const cookieStore = cookies();
    const accessTokenCookie = cookieStore.get("access_token");

    if (!accessTokenCookie) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/unibot-home-data/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessTokenCookie.value}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error || "Failed to fetch home page unibot data");
    }

    const data = await response.json();

    return data.home_unibot_data;
  } catch (error) {
    console.error("Error fetching home page unibot data:", error.message);
    throw error;
  }
}
