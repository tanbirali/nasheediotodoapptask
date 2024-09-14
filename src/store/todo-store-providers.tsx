"use client";

import { createContext, ReactNode, useContext, useRef } from "react";
import { createTodoStore, initTodoStore, type todoStore } from "./todo-store";
import { type StoreApi, useStore } from "zustand";

export const TodoStoreContext = createContext<StoreApi<todoStore> | null>(null);
export interface todoStoreProviderProps {
  children: ReactNode;
}

export const TodoStoreProvider = ({ children }: todoStoreProviderProps) => {
  const storeRef = useRef<StoreApi<todoStore>>();
  if (!storeRef.current) storeRef.current = createTodoStore(initTodoStore());

  return (
    <TodoStoreContext.Provider value={storeRef.current}>
      {children}
    </TodoStoreContext.Provider>
  );
};

export const useTodoStore = <T,>(selector: (store: todoStore) => T): T => {
  const todoStoreContext = useContext(TodoStoreContext);

  if (!todoStoreContext) {
    throw new Error(`useTodoStore must be used within TodoStoreProvider`);
  }

  return useStore(todoStoreContext, selector);
};
