import React from 'react';
import { useEffect, useState } from 'react';
import { TaskProps } from '../models/Types';
import Task from './Task';
import { getAllTasks } from '../services/Api';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const Home = () => {
  const [tasks, setTasks] = useState<TaskProps[]>();
  const [updated, setUpdated] = useState<boolean>(false);
  const [addTask, setAddTask] = useState<boolean>(false);

  // Hooks
  useEffect(() => {
  // Get all tasks from the db to display
  // Triggers every time an update (updated state changes) happens (update, delete, create)
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

    setAddTask(false);
  }, [updated]);
  
  // Functions
  const flipUpdated = () => {
  // Changes the updated state
  // the state itself does not matter, only that it is changed
    if (updated == false) {
      setUpdated(true);
    } else {
      setUpdated(false);
    }
  }

  const flipAddTask = () => {
  // Changes the addTask state
    if (addTask == false) {
      setAddTask(true);
    } else {
      setAddTask(false);
    }
  }

  const displayTasks = (task: TaskProps) => {
  // Renders a Task component to display a task
    return (
    <Task
        key={task.id}
        task={task}
        isNewTask={false}
        signUpdate={flipUpdated}
    />
    );
  }

  const createTask = () => {
  // Renders an editable Task component to create a new task
    return (
      <Task
        isNewTask={addTask}
        onCancelCreate={flipAddTask}
        signUpdate={flipUpdated}
      />
    );
  }

  return (
    <div className="App">
      <Container>
        {!tasks ? "Loading..." : tasks.map(displayTasks)}
        {!addTask ? <Button className="add-task" variant="secondary" onClick={flipAddTask}>+</Button> : createTask()}
      </Container>
    </div>
  );
}

export default Home;