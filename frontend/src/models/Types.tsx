// Enumerations
enum TaskStates {
    todo = "To Do",
    in_progress = "In Progress",
    done = "Done"
}

enum TaskPriorities {
    high = "high",
    medium = "medium",
    low = "low"
}

// Types
export type TaskProps = {
    _id: string;
    description: string;
    priority: string;
    state: string;
    due_date: string;
}