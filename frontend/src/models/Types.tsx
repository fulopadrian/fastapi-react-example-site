// Enumerations
export enum TaskStates {
    todo = "To Do",
    in_progress = "In Progress",
    done = "Done"
}

export enum TaskPriorities {
    high = "high",
    medium = "medium",
    low = "low"
}

// Types
export type TaskProps = {
    id: string;
    description: string;
    priority: TaskPriorities;
    state: TaskStates;
    due_date: Date | null;
}