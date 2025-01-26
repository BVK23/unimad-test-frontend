import { update } from "lodash";
import { create } from "zustand";

export const useUnibotStore = create(set => ({
  isUniBotOpen: false,
  isUnibotLoading: false,
  unibotTriggerHome: false,
  updateIsUniBotOpen: isOpen => {
    set({ isUniBotOpen: isOpen });
  },
  updateIsUnibotLoading: isLoading => {
    set({ isUnibotLoading: isLoading });
  },
  setUnibotTriggerHome: trigger => {
    set({ unibotTriggerHome: trigger });
  },
}));
