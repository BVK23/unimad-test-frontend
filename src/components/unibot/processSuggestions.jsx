// src/components/unibot/processSuggestions.jsx

export const extractSuggestions = (botMessage, preserveContent = false) => {
  const suggestionMatch = botMessage.match(/```json\s*([[{][\s\S]*?[}\]])\s*```/);

  let extractedSuggestions = [];
  let cleanedBotMessage = botMessage;

  if (suggestionMatch) {
    try {
      const parsedJSON = JSON.parse(suggestionMatch[1]); // Try parsing the matched JSON content
      const dataValue = parsedJSON.data;

      if (typeof dataValue === "string") {
        extractedSuggestions = [dataValue];
        cleanedBotMessage = preserveContent
          ? botMessage.replace(suggestionMatch[0], dataValue)
          : botMessage.replace(suggestionMatch[0], "").trim();
      } else if (Array.isArray(dataValue)) {
        extractedSuggestions = dataValue;
        // Join array elements with bold formatting and double newlines for markdown
        const boldSuggestions = dataValue.map(item => `**${item}**`);
        cleanedBotMessage = preserveContent
          ? botMessage.replace(suggestionMatch[0], boldSuggestions.join("\n\n")).trim()
          : botMessage.replace(suggestionMatch[0], "").trim();
      } else {
        cleanedBotMessage = botMessage.replace(suggestionMatch[0], "").trim();
        extractedSuggestions = [dataValue];
      }
    } catch (error) {
      console.log("Error parsing JSON in bot message:", botMessage, "With error:", error);
      // Return unmodified bot message and empty suggestions in case of error
      return { cleanedBotMessage, extractedSuggestions };
    }
  }

  return { cleanedBotMessage, extractedSuggestions };
};

export const processHistorySuggestions = (chatHistory, preserveContent = false, append = false) => {
  let lastSuggestions = [];
  const processedHistory = chatHistory.map(chatMessage => {
    if (chatMessage.type === "bot") {
      const { cleanedBotMessage, extractedSuggestions } = extractSuggestions(
        chatMessage.message,
        preserveContent
      );
      if (extractedSuggestions.length > 0) {
        lastSuggestions = append
          ? [...new Set([...lastSuggestions, ...extractedSuggestions])] // Merge and remove duplicates
          : extractedSuggestions; // Replace suggestions otherwise
      }
      return { ...chatMessage, message: cleanedBotMessage };
    }
    return chatMessage;
  });
  return { processedHistory, suggestions: lastSuggestions };
};
