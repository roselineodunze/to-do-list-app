"use client";
import React, { useState, useContext, useEffect } from "react";
import { Edit, Trash } from "iconsax-react";
import useTaskStore from "../stores/taskStore";


const TaskList = ({ task }) => {
  const [isEditHovered, setEditHovered] = useState(false);
  const [isDelHovered, setDelHovered] = useState(false);
  const { removeTask, toggleTask, setIsEdit, setTaskToEdit } = useTaskStore();

  const editTask = () => {
    setIsEdit(true)
    setTaskToEdit(task)
  }

  const delTask = async () => {
    console.log("id is" + task.id);
    removeTask(task.id);
  };

  return (
    <div className="border flex gap-3 items-center p-3 mb-5">
      <div
        className={`h-6 w-6 rounded-full cursor-pointer ${
          task.completed
            ? "bg-green-600 border border-green-600"
            : "bg-transparent border border-white"
        }`}
        onClick={() => toggleTask(task.id)}
      ></div>
      <div className="flex-grow text-white">
        <h1 className={`${task.completed ? "line-through" : ""}`}>{task.title}</h1>
      </div>
      <div className="w-14 flex items-center gap-2">
        <Edit
          size="24"
          color={isEditHovered ? "#16A34A" : "#FFFFFF"}
          className="cursor-pointer"
          onMouseEnter={() => setEditHovered(true)}
          onMouseLeave={() => setEditHovered(false)}
          onClick={editTask}
        />
        <Trash
          size="24"
          color={isDelHovered ? "#DC2626" : "#FFFFFF"}
          className="cursor-pointer"
          onMouseEnter={() => setDelHovered(true)}
          onMouseLeave={() => setDelHovered(false)}
          onClick={delTask}
        />
      </div>
    </div>
  );
};

export default TaskList;
