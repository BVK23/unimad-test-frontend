// src/components/unibot/fetchInitialChat.js
export const fetchInitialChat = async sectionName => {
  try {
    // Make the internal POST request to our Next.js route
    const response = await fetch("/api/unibot-api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
};
