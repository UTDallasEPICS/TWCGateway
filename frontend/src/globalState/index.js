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





// export const useXStore = create((set) => ({
//     user: {
//       email: "",
//       userName: "",
//     },

//     setUser: (email, userName) => {
//       set(() => ({
//         user: {
//           email,
//           userName,
//         },
//       }));
//     },
//   }));
