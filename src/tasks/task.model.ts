export interface Task{
    id: string,
    title: string,
    status: string
}


export enum TASK_STATUS {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    CLOSED = "CLOSED"
}