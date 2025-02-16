"use client";
import React, { useContext, useEffect, useState } from "react";
import TaskList from "./TaskList";
import AddTask from "./AddTask";
import useTaskStore from "../stores/taskStore";

const TaskManager = () => {
  const { tasks } = useTaskStore();
  if (!tasks) return 
  const completedTasks = tasks.filter(task => task.completed).length;


  return (
    <div className="md:w-[610px] sm:w-[80vw] w-[90vw] flex flex-col h-full">
      <div className="flex items-center border p-5">
        <div className="w-[50%] text-white flex flex-col items-center">
          <h1 className="sm:text-6xl text-3xl">Task Done</h1>
          <h1 className="sm:text-4xl text-xl">Keep it up!</h1>
        </div>
        <div className="w-[50%] flex justify-center items-center">
          <div className="bg-green-600 sm:h-40 sm:w-40 w-32 h-32 rounded-full flex justify-center items-center">
            <h1 className="sm:text-7xl text-5xl text-white">
              {completedTasks}/{tasks.length}
            </h1>
          </div>
        </div>
      </div>
      <AddTask />
      <div className="h-50% h-[40vh] overflow-scroll mt-7 mb-2 flex flex-col">
        {tasks.length === 0 ? (
          <div className="text-center text-sm">
            <h1 className="text-gray-300">No task added yet.</h1>
          </div>
        ) : (
          tasks.map((task, i) => (
            <TaskList
              key={i}
              task={task}
            />
          ))
        )}
        

      </div>
    </div>
  );
};

export default TaskManager;
