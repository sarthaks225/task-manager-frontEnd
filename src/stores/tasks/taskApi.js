import { useApi } from "../../api/apiHooks";

export const getTasks = async () => {
  try {
    const res = await useApi().get("getTasks");
    return { status: res.status, data: res.data };
  } catch (error) {
    return {
      status: error.response?.status,
      message: error?.response?.data?.message || "Failed to fetch tasks",
    };
  }
};

export const addTask = async (task) => {
  try {
    const res = await useApi().post("addTask", task);
    return { status: res.status, data: res.data };
  } catch (error) {
    return {
      status: error.response?.status,
      message: error?.response?.data?.message || "Failed to add task",
    };
  }
};

export const updateTask = async (id, updatedTask) => {
  try {
    // Use PUT and send the full task object
    console.log("Updating task with ID:", id, "Data:", updatedTask);
    const res = await useApi().put("updateTask", updatedTask, {}, { id });
    return { status: res.status, data: res.data };
  } catch (error) {
    return {
      status: error.response?.status,
      message: error?.response?.data?.message || "Failed to update task",
    };
  }
};
