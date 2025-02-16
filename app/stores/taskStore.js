import { create } from "zustand";

const useTaskStore = create((set) => ({
  tasks: [],
  isEdit: false,
  taskToEdit: null,
  setIsEdit: (value) => set({ isEdit: value }),
  setTaskToEdit: (task) => set({ taskToEdit: task }),

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, { id: Date.now(), ...task }],
    })),

  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),

  updateTitle: (id, title) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, title: title } : task
      ),
    })),

  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));

export default useTaskStore;
