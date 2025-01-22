"use client";
import React, { useContext, useEffect, useState } from "react";
import TaskList from "./TaskList";
import AddTask from "./AddTask";
import { db } from "@/appwrite/database";
import { TaskContext } from "../[context]/TaskContext";

const TaskManager = () => {
  const { tasks } = useContext(TaskContext);
  const [totalTasks, setTotalTask] = useState(0);
  const [completedTask, setCompletedTask] = useState(0);

  useEffect(() => {
    setTotalTask(tasks.length);
    const completed = tasks.filter((t, i) => {
      t.complete == false;
    });
    setCompletedTask(completed.length)
    console.log("completed task is: " + completed)
  }, [tasks]);

  return (
    <div className="md:w-[610px] sm:w-[80vw] w-[90vw] flex flex-col h-[100vh]">
      <div className="flex items-center border p-5">
        <div className="w-[50%] text-white flex flex-col items-center">
          <h1 className="sm:text-6xl text-3xl">Task Done</h1>
          <h1 className="sm:text-4xl text-xl">Keep it up</h1>
        </div>
        <div className="w-[50%] flex justify-center items-center">
          <div className="bg-green-600 sm:h-40 sm:w-40 w-32 h-32 rounded-full flex justify-center items-center">
            <h1 className="sm:text-7xl text-5xl text-white">
              {completedTask}/{totalTasks}
            </h1>
          </div>
        </div>
      </div>
      <AddTask />
      <div className="h-50% h-[40vh] overflow-scroll mt-7 flex flex-col">
        {tasks.length === 0 ? (
          <div className="text-center text-sm">
            <h1 className="text-gray-300">No tasks added yet.</h1>
          </div>
        ) : (
          tasks.map((task, i) => (
            <TaskList
              key={i}
              id={task.$id}
              title={task.title}
              isComplete={task.complete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskManager;
