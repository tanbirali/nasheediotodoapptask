import { create } from "zustand";
import { createStore } from "zustand/vanilla";

export type todo = {
  id: number;
  title: string;
  status: status;
};

export enum status {
  done = "done",
  pending = "pending",
}

export type todoState = {
  todos: todo[];
};

export type todoActions = {
  addNewTodo: (newTodoTitle: string) => void;
  updateTodo: (id: number, updatedTitle: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodoStatus: (id: number) => void;
};

export type todoStore = todoState & todoActions;
export const initTodoStore = (): todoState => {
  return {
    todos: [{ id: 1, title: "Build a todo app", status: status.pending }],
  };
};
export const defaultInitState: todoState = {
  todos: [],
};

export const createTodoStore = (initState: todoState = defaultInitState) => {
  return createStore<todoStore>()((set) => ({
    ...initState,
    addNewTodo: (newTodoTitle: string) =>
      set((state) => ({
        todos: [
          ...state.todos,
          {
            id: state.todos.length + 1,
            title: newTodoTitle,
            status: status.pending,
          },
        ],
      })),
    updateTodo: (id: number, updatedTitle: string) =>
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, title: updatedTitle } : todo
        ),
      })),
    deleteTodo: (id: number) =>
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      })),
    toggleTodoStatus: (id: number) =>
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                status:
                  todo.status === status.done ? status.pending : status.done,
              }
            : todo
        ),
      })),
  }));
};
