import axios from "axios";
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

export const updateTask = async (task) => {
  try {
    const res = await useApi().put("updateTask", task, {}, { id: task.id });
    return { status: res.status, data: res.data };
  } catch (error) {
    return {
      status: error.response?.status,
      message: error?.response?.data?.message || "Failed to update task",
    };
  }
};

export const deleteTask = async (taskId) => {
  try {
    const res = await useApi().deleteRequest(
      "deleteTask",
      {},
      {},
      { id: taskId }
    );
    return { status: res.status, data: res.data };
  } catch (error) {
    return {
      status: error.response?.status,
      message: error?.response?.data?.message || "Failed to delete task",
    };
  }
};
