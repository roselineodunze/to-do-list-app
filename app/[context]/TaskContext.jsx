"use client";
import { createContext, useEffect, useState } from "react";
import { ArrowRotateRight } from "iconsax-react";
import { db } from "@/appwrite/database";

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    
    try {
      const response = await db.tasks.list();
      setTasks(response.documents);
      
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const contextData = {
    tasks,
    setTasks,
    isEdit,
    setIsEdit,
    taskToEdit,
    setTaskToEdit,
  };

  return (
    <TaskContext.Provider value={contextData}>
      {loading ? (
        <div
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ArrowRotateRight className="saving-icon" size="100" color="#fff" />
        </div>
      ) : (
        children
      )}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
