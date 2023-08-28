import React from "react";
import { useEffect, useState } from "react";
import { TaskProps, TaskStates, TaskPriorities } from "../models/Types";
import { deleteTask, updateTask, createTask } from "../services/Api";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

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

    const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTaskState(event.currentTarget.value as TaskStates);
    }

    const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTaskPriority(event.currentTarget.value as TaskPriorities);
    }

    const handleDescritpionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTaskDescription(event.currentTarget.value);
    }

    const handleSubmit = async (event: React.FormEvent) => {
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
        <Card border="light" bg="dark" text="white" className="mb-2" onClick={flipEditState}>
            <Card.Header>
                <Card.Subtitle>State: {task?.state}</Card.Subtitle>
                <Card.Subtitle>Priority: {task?.priority}</Card.Subtitle>
            </Card.Header>
            <Card.Body>
                <Card.Text className="task-description">{task?.description}</Card.Text>
            </Card.Body>
        </Card>
        :
        <Form onSubmit={handleSubmit}>
            <hr />
            <Form.Group>
                <Form.Label>State</Form.Label>
                <Form.Select value={taskState} onChange={handleStateChange}>
                    <option value={TaskStates.todo}>{TaskStates.todo}</option>
                    <option value={TaskStates.in_progress}>{TaskStates.in_progress}</option>
                    <option value={TaskStates.done}>{TaskStates.done}</option>
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Label>Priority</Form.Label>
                <Form.Select value={taskPriority} onChange={handlePriorityChange}>
                    <option value={TaskPriorities.high}>{TaskPriorities.high}</option>
                    <option value={TaskPriorities.medium}>{TaskPriorities.medium}</option>
                    <option value={TaskPriorities.low}>{TaskPriorities.low}</option>
                </Form.Select>
            </Form.Group>
            <Form.Control className="mt-2 mb-2" as="textarea" rows={3} type="text" value={taskDescription} onChange={handleDescritpionChange}/>
            <ButtonGroup>
                <Button type="submit">Save</Button>
                {!isNewTask ? <Button variant="secondary" onClick={flipEditState}>Cancel</Button> : <Button variant="secondary" onClick={() => {if (onCancelCreate !== undefined) {onCancelCreate();}}}>Cancel</Button>}
            </ButtonGroup>
            {!isNewTask ? <Button className="delete-task" variant="danger" onClick={handleDelete}>Delete</Button> : <></>}
            <hr />
        </Form>
        }
        </>
    );
}

export default Task;