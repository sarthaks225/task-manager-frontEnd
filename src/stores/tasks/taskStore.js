import { create } from "zustand";
import { getTasks, addTask, updateTask } from "./taskApi";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  loading: false,
  message: null,

  resetTaskState: () => set({ loading: false, message: null }),

  fetchTasks: async () => {
    set({ loading: true, message: null });
    const res = await getTasks();
    if (res?.status === 200) {
      set({ tasks: res.data, loading: false });
    } else {
      set({ message: res?.message, loading: false });
    }
  },

  addTask: async (title) => {
    set({ loading: true, message: null });
    console.log("Adding task with title:", title);
    const res = await addTask(title);
    if (res?.status === 200 || res?.status === 201) {
      set({ tasks: [...get().tasks, res.data], loading: false });
    } else {
      set({ message: res?.message, loading: false });
    }
  },

  updateTaskStatus: async (id, status) => {
    set({ loading: true, message: null });
    // Find the task to update
    const task = get().tasks.find((t) => t.id === id);
    if (!task) {
      set({ message: "Task not found", loading: false });
      return;
    }
    // Send the full updated task object
    const updatedTask = { ...task, status };
    const res = await updateTask(id, updatedTask);
    if (res?.status === 200 || res?.status === 201) {
      set({
        tasks: get().tasks.map((t) => (t.id === id ? res.data : t)),
        loading: false,
      });
    } else {
      set({ message: res?.message, loading: false });
    }
  },
}));
