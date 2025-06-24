import { create } from "zustand";
import { signup } from "./signup";

export const useSignupStore = create((set) => ({
  success: false,
  message: null,
  loading: false,
  resetSignupUser: () => set({ success: false, loading: false, message: null }),
  signupUser: async (user) => {
    set({ success: false, loading: true, message: null }); // reset state here
    const res = await signup(user);
    if (res?.status === 200 || res?.status === 201) {
      set({ success: true, message: res?.message, loading: false });
    } else {
      set({
        success: false,
        message: res?.message || "Unexpected error",
        loading: false,
      });
    }
  },
}));
