import React from 'react';
import { useEffect, useState } from 'react';
import '../App.css';
import { TaskProps } from '../models/Types';
import Task from './Task';
import { getAllTasks } from '../services/Api';
import CreateTask from './CreateTask';

const Home = () => {
  const [tasks, setTasks] = useState<TaskProps[]>();
  const [updated, setUpdated] = useState<boolean>(false);
  const [addTask, setAddTask] = useState<boolean>(false);

  // Hooks
  useEffect(() => {
    const fetchAllTasks = async () => {
      const data = await getAllTasks();

      setTasks(data); 
    }

    try {
      fetchAllTasks();
    }
    catch(err) {
      console.log(err);
    }
  }, [updated]);
  
  // Functions
  const flipUpdated = () => {
    if (updated == false) {
      setUpdated(true);
    } else {
      setUpdated(false);
    }
  }

  const flipAddTask = () => {
    if (addTask == false) {
      setAddTask(true);
    } else {
      setAddTask(false);
    }
  }

  const displayTasks = (task: TaskProps) => {
    return (
    <Task
        key={task.id}
        task={task}
        newTask={false}
        onTaskChange={setTasks}
        signUpdate={flipUpdated}
    />
    );
  }

  return (
    <div className="App">
      {!tasks ? 
      "Loading..."
      :
      tasks.map(displayTasks)
    }
    {!addTask ? <button onClick={flipAddTask}>Add new task</button>
    :
    <CreateTask
        newTask={addTask}
        onTaskChange={setTasks}
        signUpdate={flipUpdated}
    />}
    </div>
  );
}

export default Home;