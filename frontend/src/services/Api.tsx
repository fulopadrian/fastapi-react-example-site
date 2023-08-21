// Variables and constants
const api_url = "http://127.0.0.1:8000"

// Enumerations
enum ApiEndpoints {
    getAllTasks = "/getAllTasks"
}

// API functions
export const getAllTasks = async () => {
    return fetch(api_url + ApiEndpoints.getAllTasks)
    .then((res) => res.json())
}