"use client";

import TodoItem from "@/components/todoItem";
import { status } from "@/store/todo-store";
import { useTodoStore } from "@/store/todo-store-providers";
import React, { useState } from "react";

const Index = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const { todos, addNewTodo } = useTodoStore((state) => state);

  return (
    <div className="flex flex-col bg-gray-300 h-screen justify-center items-center w-full ">
      <div className="p-2 lg:p-8 w-full">
        <h1 className="text-center text-5xl font-bold">To Do Application</h1>
        <div className="flex gap-3 p-4 items-center">
          <input
            placeholder="Enter your task"
            className="p-2 w-full rounded-md outline-none"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white  rounded-md p-2 w-40  "
            onClick={() => {
              if (taskTitle.trim()) {
                addNewTodo(taskTitle);
                setTaskTitle("");
              }
            }}
          >
            Add Task
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full  gap-2 lg:gap-8">
          <div className=" border rounded-md border-black w-full h-full ">
            <div className="w-full bg-yellow-400 rounded-md">
              <h1 className="text-xl font-bold p-2 text-white text-center">
                Pending
              </h1>
            </div>
            <ul className="p-4 ">
              {todos
                .filter((item) => item.status === status.pending)
                .map((data, index) => (
                  <TodoItem
                    key={index}
                    id={data.id}
                    title={data.title}
                    status={data.status}
                  />
                ))}
            </ul>
          </div>
          <div className="border rounded-md border-black w-full h-full ">
            <div className="w-full bg-green-400 rounded-md">
              <h1 className="text-xl font-bold p-2 text-white text-center">
                Done
              </h1>
            </div>
            <ul className="p-4 flex-wrap">
              {todos
                .filter((item) => item.status === status.done)
                .map((data, index) => (
                  <TodoItem
                    key={index}
                    id={data.id}
                    title={data.title}
                    status={data.status}
                  />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
