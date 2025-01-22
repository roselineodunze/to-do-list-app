"use client";
import React, {useState, useContext, useEffect} from 'react'
import { Edit, Xrp } from 'iconsax-react'
import { db } from '@/appwrite/database';
import { TaskContext } from '../[context]/TaskContext';

const TaskList = ({title="yes", id="1"}) => {
    const [isEditHovered, setEditHovered] = useState(false);
    const [isDelHovered, setDelHovered] = useState(false);
    const {tasks, setIsEdit, setTaskToEdit, setTasks} = useContext(TaskContext)

    const task = tasks.find(task => task.$id === id);

    const { complete: initialComplete } = task;
    const [complete, setComplete] = useState(initialComplete);

    useEffect(() => {
      setComplete(initialComplete);
    }, [initialComplete]);

    const editStatus = async () => {
      console.log("editing")
      const newCompleteStatus = !complete;
      const payload = { complete: newCompleteStatus }; 
      try {
          await db.tasks.update(id, payload); 
          setTasks(prevState =>
            prevState.map(t =>
                t.$id === id ? { ...t, complete: newCompleteStatus } : t
            )
          );
      } catch (error) {
          console.log("Error updating task status:", error);
      }
  };

    const editTask = () => {
      setIsEdit(true)
      setTaskToEdit({ title, id })
    }

    const delTask = async() => {
      console.log("deleting")
      console.log("id is" + id)
        try {
            const response = await db.tasks.delete(id);
            
            if (response) {
                console.log("Task deleted successfully:");
                setTasks(prevState => prevState.filter(task => task.$id !== id));
            } else {
                console.error("Failed to delete task:", response);
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }
  return (
    <div className='border flex gap-3 items-center p-3 mb-5'>
        <div className={`h-6 w-6 rounded-full cursor-pointer ${complete ? 'bg-green-600 border border-green-600' : 'bg-transparent border border-white'}`} 

       onClick={editStatus}
      >
        </div>
        <div className='flex-grow text-white'>
            <h1 className={`${complete ? 'line-through' : ''}`}>{title}</h1>

        </div>
        <div className='w-14 flex items-center gap-2'>
        <Edit
        size="24"
        color={isEditHovered ? '#16A34A' : '#FFFFFF'}

        className="cursor-pointer"
        onMouseEnter={() => setEditHovered(true)}
        onMouseLeave={() => setEditHovered(false)}
        onClick={() => editTask()}
      />
      <Xrp
        size="24"
        color={isDelHovered ? '#DC2626' : '#FFFFFF'}

        className="cursor-pointer"
        onMouseEnter={() => setDelHovered(true)}
        onMouseLeave={() => setDelHovered(false)}
        onClick={delTask}
      />
        </div>
    </div>
      )
}

export default TaskList