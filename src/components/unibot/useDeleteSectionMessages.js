import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSectionMessage } from "./actions";

// Import your server action

export const useDeleteSectionMessages = sectionName => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteType => deleteSectionMessage(sectionName, deleteType), // Use the server action
    onSuccess: () => {
      // Invalidate the chat history query so that it refetches the updated data
      queryClient.refetchQueries(["chatHistory", sectionName]);
    },
    onError: error => {
      // Handle error if needed
      console.log("Error deleting message:", error);
    },
  });
};
