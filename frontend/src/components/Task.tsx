import React from "react";
import { useEffect, useState } from "react";
import { TaskProps, TaskStates, TaskPriorities } from "../models/Types";
import { deleteTask, updateTask } from "../services/Api";

const Task = ({task, newTask, onTaskChange, signUpdate}: {task?: TaskProps, newTask: boolean, onTaskChange: Function, signUpdate: Function}) => {
    const [editState, setEditState] = useState<boolean>(false);
    const [taskId, setTaskId] = useState<string>("");
    const [taskState, setTaskState] = useState<TaskStates>(TaskStates.todo);
    const [taskPriority, setTaskPriority] = useState<TaskPriorities>(TaskPriorities.medium);
    const [taskDescription, setTaskDescription] = useState<string>("");
    const [taskDueDate, setTaskDueDate] = useState<Date | null>();

    // Hooks
    useEffect(() => {
        if (editState == true && task !== undefined) {
            setTaskId(task.id)
            setTaskState(task.state);
            setTaskPriority(task.priority);
            setTaskDescription(task.description);
            setTaskDueDate(task.due_date);
        }
    }, [editState]);

    useEffect(() => {
        if (newTask == true) {
            flipEditState();   
        }
    }, []);

    // Functions
    const flipEditState = () => {
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
        event.preventDefault();
        //TODO: store new task
        if (newTask == false) {
            const patch = {
                id: taskId,
                description: taskDescription,
                priority: taskPriority,
                state: taskState,
                due_date: taskDueDate
            }

            const updatedTask = await updateTask(taskId, patch);

            onTaskChange(((prevTasks: TaskProps[]) => [...prevTasks, {updatedTask}]));
            signUpdate();
        }
        flipEditState();
    }

    const handleDelete = async (event: any) => {
        if (newTask == false) {
            const deletedTask = await deleteTask(taskId);

            onTaskChange((prevTasks: TaskProps[]) => {return prevTasks.filter(task => task.id !== taskId)});
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
                <div onClick={flipEditState}>X</div>
                {!newTask ? <div onClick={handleDelete}>D</div> : <></>}
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