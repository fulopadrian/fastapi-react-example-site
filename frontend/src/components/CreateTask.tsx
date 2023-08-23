import React from "react";
import Task from "./Task";

const CreateTask = ({newTask, onTaskChange, signUpdate}: {newTask: boolean, onTaskChange: Function, signUpdate: Function}) => {
    return (
      <Task
        newTask={newTask}
        onTaskChange={onTaskChange}
        signUpdate={signUpdate}
      />
    );
  }

  export default CreateTask;