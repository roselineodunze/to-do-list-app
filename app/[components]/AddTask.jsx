"use client";
import React, { useState, useContext, useEffect } from 'react'
import { Edit, Xrp, Add, ArrowRight2 } from 'iconsax-react'
import { db } from '@/appwrite/database';
import { TaskContext } from '../[context]/TaskContext';

const AddTask = () => {
    const {setTasks, isEdit, setIsEdit, taskToEdit} = useContext(TaskContext)

    const [title, setTitle] = useState("")

    useEffect(() => {
        if (isEdit){
            setTitle(taskToEdit.title)
        }

    }, [isEdit, taskToEdit])

    const addTask = async () => {
        console.log("added" + title)
        const payload = {
          title: title
        }
        try {
            const response = await db.tasks.create(payload);
            
            if (response && response.$id) {
                console.log("Task added successfully:", response);
                setTasks((prevState) => [response, ...prevState])
                setTitle('');
            } else {
                console.error("Failed to add task:", response);
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    }

    const updateTask = async () => {
        console.log("updating" + title)
        const payload = {
          title: title
        }
        try {
            const response = await db.tasks.update(taskToEdit.id, payload);
            
            if (response) {
                console.log("Task updated successfully:", response);
                setTasks((prevState) => prevState.map(task =>
                    task.$id === response.$id ? response : task
                ));
                setIsEdit(false);
                setTitle('');
            } else {
                console.error("Failed to update task:", response);
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    }

    const handleSubmit = async () => {
        if (isEdit) {
          updateTask();
        } else {
          addTask();
        }
    };

  return (
    <div className='mt-6 flex items-center gap-3'>
        <input type='text' placeholder='enter a new task' value={title} onChange={(e) => setTitle(e.target.value)} className='bg-gray-900 text-white rounded-md p-2 flex-grow'/>
        <button className='bg-green-600 p-2 flex justify-center items-center rounded-md'
        onClick={handleSubmit}>
            {isEdit ? (
                <ArrowRight2 size="30" color="#ffffff" />                
                ) : (
                <Add size="32" color="#ffffff" />
                )
            }
        </button>
    </div>  
    )
}

export default AddTask