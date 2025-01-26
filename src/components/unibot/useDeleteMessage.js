import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMessage } from "./actions";

// Import your server action

export const useDeleteMessage = sectionName => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: messageId => deleteMessage(messageId, sectionName), // Use the server action
    onSuccess: () => {
      // Invalidate the chat history query so that it refetches the updated data
      queryClient.invalidateQueries(["chatHistory", sectionName]);
    },
    onError: error => {
      // Handle error if needed
      console.log("Error deleting message:", error);
    },
  });
};
