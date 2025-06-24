import { useApi } from "../../api/apiHooks";

export const signup = async (user) => {
  try {
    const res = await useApi().post("signup", user);
    return { status: res.status, data: res.data };
  } catch (error) {
    return {
      status: error.response?.status,
      message: error?.response?.data?.message || "Signup failed",
    };
  }
};
