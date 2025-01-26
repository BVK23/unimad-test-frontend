import { create } from "zustand";

export const useUnibotTriggerStore = create(set => ({
  unibotGenMessage: "", // Holds the message to be sent
  setUnibotGenMessage: unibotGenMessage => set({ unibotGenMessage }),
}));
