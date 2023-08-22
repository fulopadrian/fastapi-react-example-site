import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import { TaskProps, TaskStates, TaskPriorities } from './models/Types';
import Task from './components/Task';
import { getAllTasks } from './services/Api';

const App = () => {
  const [tasks, setTasks] = useState<TaskProps[]>();

  useEffect(() => {
    getAllTasks()
    .then(data => {
      setTasks(data);
    })
    .catch(error => console.log(error));
  }, []);
  
  const displayTasks = (task: TaskProps) => {
    return (
    <Task
      key={task.id}
      id={task.id}
      description={task.description}
      priority={task.priority}
      state={task.state}
      due_date={task.due_date}
    />
    );
  }

  return (
    <div className="App">
      {!tasks ? 
      "Loading..."
      :
      tasks.map(displayTasks)}
      <button>Add new task</button>
    </div>
  );
}

export default App;