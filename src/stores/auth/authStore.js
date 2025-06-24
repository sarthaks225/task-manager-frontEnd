import { create } from "zustand";
import { login } from "./login";
//import getUserInfoById from "./getUserInfoById";
//import resetPasswordByAdmin from "./resetPasswordByAdmin";
//import { updateTokenAndUser } from "../../api/instance";

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  message: null,
  loading: false,
  success: false,
  user: JSON.parse(localStorage.getItem("USER") || "{}"),

  resetUseAuthStore: () => {
    set(() => ({
      message: null,
      loading: false,
    }));
  },
  login: async (user) => {
    set({ success: false, loading: true, message: null });
    console.log("Login request received at store >>" + JSON.stringify(user));
    const res = await login(user);
    // console.log(res);
    if (res?.status === 200) {
      localStorage.setItem("TOKEN", JSON.stringify(res?.data?.token));
      localStorage.setItem("USER", JSON.stringify(res?.data?.user));
      //updateTokenAndUser();
      set(() => ({
        isAuthenticated: true,
        loading: false,
        success: true,
        message: res.data.message || "Login successful",
        user: res.data.user,
      }));
    } else {
      console.log("Error received at store >>" + JSON.stringify(res));
      set(() => ({
        isAuthenticated: false,
        loading: false,
        success: false,
        message: res?.message || "Unexpected error while logging in",
      }));
    }
  },

  // updateTokenAndUser: () => {
  //   set((set) => ({
  //     token: set.getToken(),
  //     user: set.getUser(),
  //   }));
  // },
  setUser: (user) => {
    localStorage.setItem("USER", JSON.stringify(user));
    set(() => ({
      user: user,
    }));
  },

  getUser: () => {
    return JSON.parse(localStorage.getItem("USER") || "{}");
  },

  getToken: () => {
    return JSON.parse(localStorage.getItem("TOKEN") || "{}");
  },

  logout: () => {
    localStorage.removeItem("USER");
    localStorage.removeItem("TOKEN");
    set(() => ({
      isAuthenticated: false,
      user: {},
      message: null,
      loading: false,
      success: false,
    }));
    window.location.href = "/login"; // Redirect to login page
  },
}));
