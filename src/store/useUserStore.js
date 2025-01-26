import { create } from "zustand";

export const useUserStore = create(set => ({
  userData: {},
  setUserData: userData => set({ userData }),
}));
