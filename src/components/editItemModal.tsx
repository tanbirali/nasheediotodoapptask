import { status } from "@/store/todo-store";
import { useTodoStore } from "@/store/todo-store-providers";
import React, { useState } from "react";
type Props = {
  modalOpen: boolean;
  onClose: () => void;
  id: number;
  title: string;
};
const EditItemModal = ({ modalOpen, onClose, id, title }: Props) => {
  const [newTitle, setNewTitle] = useState("");
  const { updateTodo } = useTodoStore((state) => state);
  const handleSubmit = () => {
    updateTodo(id, newTitle);
    onClose();
  };
  return modalOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Todo</h2>
        <input
          type="text"
          value={newTitle}
          placeholder={title}
          onChange={(e) => setNewTitle(e.target.value)}
          className="p-2 w-full border border-gray-300 rounded mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default EditItemModal;
