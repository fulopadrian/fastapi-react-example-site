import React, { EventHandler } from "react";
import { useEffect, useState } from "react";
import { TaskProps, TaskStates, TaskPriorities } from "../models/Types";

//TODO:
//Props cannot be modified. Create states for all modifiable part of the Task to be able to update or create a task

const Task = (props: TaskProps) => {
    const [editState, setEditState] = useState<boolean>(false);

    const editTask = () => {
        setEditState(true);
    }

    const handleSubmit = () => {
        setEditState(false);
    }

    return (
        <>
        {!editState ?
        <div onClick={editTask}>
            <div>
                <label>State</label>
                <div>{props.state}</div>
                <label>Priority</label>
                <div>{props.priority}</div>
                <div>X</div>
            </div>
            <p>{props.description}</p>
            <hr />
        </div>
        :
        <form onSubmit={handleSubmit}>
            <div>
                <label>State</label>
                <select value={props.state}>
                    <option value={TaskStates.todo}>{TaskStates.todo}</option>
                    <option value={TaskStates.in_progress}>{TaskStates.in_progress}</option>
                    <option value={TaskStates.done}>{TaskStates.done}</option>
                </select>
                <label>Priority</label>
                <select value={props.priority}>
                    <option value={TaskPriorities.high}>{TaskPriorities.high}</option>
                    <option value={TaskPriorities.medium}>{TaskPriorities.medium}</option>
                    <option value={TaskPriorities.low}>{TaskPriorities.low}</option>
                </select>
                <div>X</div>
            </div>
            <textarea value={props.description} />
            <input type="submit" />
            <hr />
        </form>
        }
        </>
    );
}

export default Task;