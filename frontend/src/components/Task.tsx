import React from "react";
import { TaskProps } from "../models/Types";

const Task = (props: TaskProps) => {
    return (
        <div>
            <div>
                <div>{props.state}</div>
                <div>{props.priority}</div>
            </div>
            <p>{props.description}</p>
            <hr />
        </div>
    );
}

export default Task;