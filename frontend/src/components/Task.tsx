import React from "react";
import { useEffect, useState } from "react";
import { TaskProps, TaskStates, TaskPriorities } from "../models/Types";
import { deleteTask, updateTask, createTask } from "../services/Api";

const Task = ({task, isNewTask, onCancelCreate, signUpdate}: {task?: TaskProps, isNewTask: boolean, onCancelCreate?: Function, signUpdate: Function}) => {
    const [editState, setEditState] = useState<boolean>(false);
    const [taskId, setTaskId] = useState<string | undefined>("");
    const [taskState, setTaskState] = useState<TaskStates>(TaskStates.todo);
    const [taskPriority, setTaskPriority] = useState<TaskPriorities>(TaskPriorities.medium);
    const [taskDescription, setTaskDescription] = useState<string>("");
    const [taskDueDate, setTaskDueDate] = useState<Date>();

    // Hooks
    useEffect(() => {
    // Sets every input states if the edit state triggerd and true
        if (editState == true && task !== undefined) {
            setTaskId(task.id)
            setTaskState(task.state);
            setTaskPriority(task.priority);
            setTaskDescription(task.description);
            setTaskDueDate(task.due_date);
        }
    }, [editState]);

    useEffect(() => {
    // Triggers the edit statet if a new task created
        if (isNewTask == true) {
            flipEditState();   
        }
    }, []);

    // Functions
    const flipEditState = () => {
    // Changes the editState
        if (editState == false)
        {
            setEditState(true);
        } else {
            setEditState(false);
        }
    }

    const handleStateChange = (event: any) => {
        setTaskState(event.target.value);
    }

    const handlePriorityChange = (event: any) => {
        setTaskPriority(event.target.value);
    }

    const handleDescritpionChange = (event: any) => {
        setTaskDescription(event.target.value);
    }

    const handleSubmit = async (event: any) => {
    // Handels the submit of the form
    // Either updates a task in db or creates a new one
        event.preventDefault();
        
        if (isNewTask == false) {
            const patch = {
                id: taskId,
                description: taskDescription,
                priority: taskPriority,
                state: taskState,
                due_date: taskDueDate
            }

            const updatedTask = await updateTask(taskId, patch);

            signUpdate();
        }
        else if (isNewTask == true) {
            const newTask = {
                description: taskDescription,
                priority: taskPriority,
                state: taskState,
                due_date: taskDueDate
            }
            
            const createdTask = await createTask(newTask);

            signUpdate();
        }
        flipEditState();
    }

    const handleDelete = async (event: any) => {
    // Handle the deletion of a task
        if (isNewTask == false) {
            const deletedTask = await deleteTask(taskId);

            signUpdate();
        }
    }

    return (
        <>
        {!editState ?
        <div onClick={flipEditState}>
            <div>
                <label>State</label>
                <div>{task?.state}</div>
                <label>Priority</label>
                <div>{task?.priority}</div>
            </div>
            <p>{task?.description}</p>
            <hr />
        </div>
        :
        <form onSubmit={handleSubmit}>
            <div>
                <label>State</label>
                <select value={taskState} onChange={handleStateChange}>
                    <option value={TaskStates.todo}>{TaskStates.todo}</option>
                    <option value={TaskStates.in_progress}>{TaskStates.in_progress}</option>
                    <option value={TaskStates.done}>{TaskStates.done}</option>
                </select>
                <label>Priority</label>
                <select value={taskPriority} onChange={handlePriorityChange}>
                    <option value={TaskPriorities.high}>{TaskPriorities.high}</option>
                    <option value={TaskPriorities.medium}>{TaskPriorities.medium}</option>
                    <option value={TaskPriorities.low}>{TaskPriorities.low}</option>
                </select>
                {!isNewTask ? <div onClick={flipEditState}>X</div> : <div onClick={() => {if (onCancelCreate !== undefined) {onCancelCreate();}}}>X</div>}
                {!isNewTask ? <div onClick={handleDelete}>D</div> : <></>}
            </div>
            <textarea value={taskDescription} onChange={handleDescritpionChange}/>
            <input type="submit" />
            <hr />
        </form>
        }
        </>
    );
}

export default Task;