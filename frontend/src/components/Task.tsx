import React, { ChangeEventHandler, EventHandler, FormEvent, FormEventHandler } from "react";
import { useEffect, useState } from "react";
import { TaskProps, TaskStates, TaskPriorities } from "../models/Types";
import { updateTask } from "../services/Api";

const Task = (props: TaskProps) => {
    const [editState, setEditState] = useState<boolean>(false);
    const [taskId, setTaskId] = useState<string>("");
    const [taskState, setTaskState] = useState<TaskStates>(TaskStates.todo);
    const [taskPriority, setTaskPriority] = useState<TaskPriorities>(TaskPriorities.medium);
    const [taskDescription, setTaskDescription] = useState<string>("");

    //TODO:
    //Create a state that is true, if update (rerender) is needed, like after a task update, delete or create
    //Use this state to rerender if needed

    // Hooks
    useEffect(() => {
        if (editState == true) {
            setTaskId(props.id)
            setTaskState(props.state);
            setTaskPriority(props.priority);
            setTaskDescription(props.description);
        }
    }, [editState]);

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

    const handleSubmit = (event: any) => {
        event.preventDefault();
        //TODO: store new task
        if (props.newTask == false) {
            const patch = {
                id: taskId,
                description: taskDescription,
                priority: taskPriority,
                state: taskState,
                due_date: props.due_date
            }

            updateTask(taskId, patch);
        }
        flipEditState();
    }

    return (
        <>
        {!editState ?
        <div onClick={flipEditState}>
            <div>
                <label>State</label>
                <div>{props?.state}</div>
                <label>Priority</label>
                <div>{props?.priority}</div>
                <div>X</div>
            </div>
            <p>{props?.description}</p>
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