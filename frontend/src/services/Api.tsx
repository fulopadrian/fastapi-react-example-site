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
export const createTask =async (task:TaskProps) => {
    return await fetch(api_url + ApiEndpoints.createTask, {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(task),
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export const getAllTasks = async () => {
    return await fetch(api_url + ApiEndpoints.getAllTasks)
    .then((res) => res.json())
    .catch(error => console.log(error));
}

export const getTask = async (id: string) => {
    return await fetch(api_url + ApiEndpoints.getTask + "?id=" + id)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export const updateTask = async (id: string, task: TaskProps) => {
    return await fetch(api_url + ApiEndpoints.updateTask + "?id=" + id, {
        method: "PATCH",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(task),
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export const deleteTask = async (id: string) => {
    return await fetch(api_url + ApiEndpoints.deleteTask + "?id=" + id, {
        method: "DELETE",
        headers: {"Content-type": "application/json"}
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}