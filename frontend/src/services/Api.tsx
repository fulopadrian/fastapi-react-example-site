import { TaskProps } from "../models/Types";

// Variables and constants
const api_url = "http://localhost:8000"

// Enumerations
enum ApiEndpoints {
    createTask = "/createTask",
    getAllTasks = "/getAllTasks",
    updateTask = "/updateTask",
    getTask = "/getTask",
    deleteTask = "/deleteTask"
}

// API functions
// Create task
export const createTask = async (task:TaskProps) => {
    try {
        const res = await fetch(api_url + ApiEndpoints.createTask, {
            method: "PUT",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(task),
        });

        return await res.json();
    }
    catch(err) {
        console.log(err);
    }
}

// Get all tasks
export const getAllTasks = async () => {
    try {
        const res = await fetch(api_url + ApiEndpoints.getAllTasks);

        return await res.json();
    }
    catch(err) {
        console.log(err);
    }
}

// Get one task by id
export const getTask = async (id: string) => {
    try {
        const res = await fetch(api_url + ApiEndpoints.getTask + "?id=" + id);

        return await res.json();
    }
    catch(err) {
        console.log(err);
    }
}

// Update task by id
export const updateTask = async (id: string | undefined, task: TaskProps) => {
    try {
        const res = await fetch(api_url + ApiEndpoints.updateTask + "?id=" + id, {
            method: "PATCH",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(task),
        });

        return await res.json();
    }
    catch(err) {
        console.log(err);
    }
}

// Delete task by id
export const deleteTask = async (id: string | undefined) => {
    try {
        const res = await fetch(api_url + ApiEndpoints.deleteTask + "?id=" + id, {
            method: "DELETE",
            headers: {"Content-type": "application/json"}
        });

        return await res.json();
    }
    catch(err) {
        console.log(err);
    }
}