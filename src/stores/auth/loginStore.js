import { useApi } from "../../api/apiHooks";

const login = async (email, password) => {
  try {
    const res = await useApi().post("login", { email, password });
    return res;
  } catch (error) {
    return {
      status: error.response?.data?.status,
      message: error?.response?.data?.error,
    };
  }
};

export default login;
