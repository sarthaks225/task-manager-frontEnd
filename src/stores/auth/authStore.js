import { create } from "zustand";
//import login from "./login";
//import getUserInfoById from "./getUserInfoById";
//import resetPasswordByAdmin from "./resetPasswordByAdmin";
//import { updateTokenAndUser } from "../../api/instance";

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  error: null,
  token: JSON.parse(localStorage.getItem("TOKEN") || "{}"),
  user: JSON.parse(localStorage.getItem("USER") || "{}"),
  accessConfig: JSON.parse(localStorage.getItem("accessConfig") || "{}"),

  resetError: () => {
    set(() => ({
      error: null,
    }));
  },
  login: async (email, password) => {
    const res = await login(email, password);
    // console.log(res);
    if (res?.status === 200) {
      localStorage.setItem("TOKEN", JSON.stringify(res.data.data.token));
      localStorage.setItem("USER", JSON.stringify(res.data.data.user));
      //updateTokenAndUser();
      set(() => ({
        isAuthenticated: true,
        error: null,
        user: res.data.data.user,
        token: res.data.data.token,
      })); // Clear error on successful login
    } else {
      console.log("Error received at store >>" + JSON.stringify(res));
      set(() => ({
        isAuthenticated: false,
        error: res.message || "Unexpected error",
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

  // getUserInfoByID: async (id) => {
  //   const response = await getUserInfoById(id);
  //   if (response?.status === 200) {
  //     return response?.data?.data?.info;
  //   } else {
  //     console.log(
  //       "Error received at authStore store >>" + JSON.stringify(response)
  //     );
  //     set(() => ({
  //       error: response?.errorMessage || "Unexpected error",
  //     }));
  //   }
  // },

  // resetPasswordByAdmin: async (id, password) => {
  //   const response = await resetPasswordByAdmin(id, password);

  //   if (response?.status === 200) {
  //     return {
  //       success: true,
  //       error: false,
  //       message: response?.data?.data?.result,
  //     };
  //   } else {
  //     console.log("Error received at store >>" + JSON.stringify(response));
  //     return {
  //       success: false,
  //       error: true,
  //       message: response.errorMessag || "Unexpected error",
  //     };
  //   }
  // },
}));
