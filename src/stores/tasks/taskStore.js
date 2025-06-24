import { create } from "zustand";
import { useApi } from "../../api/apiHooks";

export const useTaskStore = create((set) => ({
  tasks: [],
  loading: false,

  fetchTasks: async () => {
    set({ loading: true });
    try {
      const res = await useApi().get("getTasks");
      set({ tasks: res.data.tasks, loading: false });
    } catch (err) {
      console.error("Error fetching tasks:", err);
      set({ loading: false });
    }
  },

  addTask: async (title) => {
    try {
      const res = await useApi().post("addTask", { title, status: "To Do" });
      set((state) => ({
        tasks: [...state.tasks, res.data.task],
      }));
    } catch (err) {
      console.error("Add task error:", err);
    }
  },

  updateTaskStatus: async (id, status) => {
    try {
      const res = await useApi().patch("updateTask", { status }, {}, { id });
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, status } : task
        ),
      }));
    } catch (err) {
      console.error("Update task error:", err);
    }
  },
}));
