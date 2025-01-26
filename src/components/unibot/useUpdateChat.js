import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateChat = sectionName => {
  const queryClient = useQueryClient();

  // Mutation to update chat history (local cache, not an API call)
  return useMutation({
    mutationFn: newChat => Promise.resolve(newChat),
    onSuccess: newChat => {
      queryClient.setQueryData(["chatHistory", sectionName], newChat);
    },
  });
};
