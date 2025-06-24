import { useApi } from "../../api/apiHooks";

export const login = async (user) => {
  try {
    const res = await useApi().post("login", user);
    return { status: res.status, data: res.data };
  } catch (error) {
    return {
      status: error.response?.data?.status,
      message: error?.response?.data?.message || "login failed",
    };
  }
};
