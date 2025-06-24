import axios from "axios";
import { useAuthStore } from "../stores/auth/authStore";
const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore.getState();
    let token = authStore.getToken();
    //updateTokenAndUser();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // on err throw
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // do your thing inside this interceptor on any api response
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // console.log("Interceptor 401");
      // setTimeout(() => {
      //   localStorage.removeItem("TOKEN");
      //   localStorage.removeItem("USER");
      //   location.href = "/login";
      // }, 100000);
      localStorage.removeItem("TOKEN");
      localStorage.removeItem("USER");
      location.href = "/login";
    }
    if (error.response?.status === 403) {
      localStorage.removeItem("TOKEN");
      localStorage.removeItem("USER");
      location.href = "/login";
      return;
    }
    return Promise.reject(error);
  }
);

export default instance;
