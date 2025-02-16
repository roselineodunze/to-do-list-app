"use client";
import React, { useState, useContext, useEffect } from "react";
import { Send, Add, CloseCircle } from "iconsax-react";
import useTaskStore from "../stores/taskStore";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const { addTask, updateTitle, isEdit, setIsEdit, taskToEdit, setTaskToEdit } =
    useTaskStore();
  const [titleError, setTitleError] = useState(false);

  useEffect(() => {
    if (isEdit) {
      if (taskToEdit) {
        setTitle(taskToEdit.title);
      }
    }
  }, [isEdit, taskToEdit]);

  const handleAddTask = async () => {
    const newTask = {
      title: title,
      isCompleted: false,
    };
    addTask(newTask);
    setTitle("");
  };

  const handleUpdateTask = () => {
    console.log("updating" + title);
    if (taskToEdit) {
      updateTitle(taskToEdit.id, title);
    }
    setTitle("");
    setIsEdit(false);
    setTaskToEdit(null);
  };

  const handleSubmit = () => {
    if (!title) {
      setTitleError(true);

      return;
    }
    if (isEdit) {
      handleUpdateTask();
    } else {
      handleAddTask();
    }
  };

  return (
    <>
      {titleError ? (
        <div className="bg-red-500 mt-6 p-2 text-black flex justify-between items-center rounded-sm">
          <p>Please enter a task. 🙂</p>
          <button onClick={() => setTitleError(false)}>
            {" "}
            <CloseCircle size="28" color="#000000" />
          </button>
        </div>
      ) : (
        ""
      )}
      <div className="mt-6 flex items-center gap-3">
        <input
          type="text"
          placeholder="Add a task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-900 text-white rounded-md p-2 flex-grow"
        />
        <button
          className="bg-green-600 p-2 flex justify-center items-center rounded-md"
          onClick={handleSubmit}
        >
          {isEdit ? (
            <Send size="30" color="#ffffff" />
          ) : (
            <Add size="32" color="#ffffff" />
          )}
        </button>
      </div>
    </>
  );
};

export default AddTask;
