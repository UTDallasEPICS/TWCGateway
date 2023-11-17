import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: {
    email: "staleState",
    userName: "initialState",
  },

  setUser: (email, userName) => {
    set(() => ({
      user: {
        email,
        userName,
      },
    }));
  },


}));