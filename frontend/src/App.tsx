import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import Task from './components/Task';
import { TaskProps } from './models/Types';
import { getAllTasks } from './services/Api';
// import data from './models/TestData';

const App = () => {
  const [tasks, setTasks] = useState<TaskProps[] | null>();

  useEffect(() => {
    getAllTasks()
    .then(data => {
      setTasks(data);
    });
  }, []);

  return (
    <div className="App">
      {tasks.map((item) => (
        <Task 
          key={item._id}
          _id={item._id}
          description={item.description}
          priority={item.priority}
          state={item.state}
          due_date={item.due_date}
        />
      ))}
    </div>
  );
}

export default App;