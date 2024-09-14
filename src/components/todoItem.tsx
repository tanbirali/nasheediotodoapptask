"use client";
import { status } from "@/store/todo-store";
import { useTodoStore } from "@/store/todo-store-providers";
import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import EditItemModal from "./editItemModal";

import { MdDelete } from "react-icons/md";
type Props = {
  id: number;
  title: string;
  status: status;
};
const TodoItem = ({ id, title, status }: Props) => {
  const { toggleTodoStatus, deleteTodo } = useTodoStore((state) => state);
  const [modalOpen, setModalOpen] = useState(false);
  const onClose = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1
          className={`text-xl font-medium ${
            status === "done" ? "line-through" : ""
          }`}
        >
          {title}
        </h1>
        <div className="flex items-center gap-5">
          <button onClick={() => setModalOpen(true)}>
            <FiEdit2 />
          </button>
          <button onClick={() => deleteTodo(id)}>
            <MdDelete color="red" />
          </button>

          <input
            type="checkbox"
            checked={status === "done"}
            onChange={() => toggleTodoStatus(id)}
          />
        </div>
      </div>
      <EditItemModal
        id={id}
        modalOpen={modalOpen}
        title={title}
        onClose={onClose}
      />
    </div>
  );
};

export default TodoItem;
