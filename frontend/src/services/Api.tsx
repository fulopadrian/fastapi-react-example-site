// Variables and constants
const api_url = "http://localhost:8000"

// Enumerations
enum ApiEndpoints {
    getAllTasks = "/getAllTasks"
}

// API functions
export const getAllTasks = async () => {
    return await fetch(api_url + ApiEndpoints.getAllTasks)
    .then((res) => res.json())
    .catch(error => console.log(error));
}