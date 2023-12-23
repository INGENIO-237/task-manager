import { TaskRepository } from "../repositories/tasks.repository";
import { UpdateTaskEntries } from "../schemas/tasks.schemas";
import { OperationalError } from "../utils/errors.utils";

const taskRepository = TaskRepository;

export const TaskService = {
  getTasks: async ({ user, ...filter }: { user: string }) => {
    return await taskRepository.getTasks({ user, ...filter });
  },
  createTask: async ({ user, title }: { user: string; title: string }) => {
    return await taskRepository.createTask({ user, title });
  },
  updateTask: async (taskId: string, update: UpdateTaskEntries["body"]) => {
    const task = await taskRepository.getTaskById(taskId);

    if (!task) throw new OperationalError("Task not found");
    
    await taskRepository.updateTask(taskId, update);
  },
  deleteTask: async(taskId: string) => {
    const task = await taskRepository.getTaskById(taskId);

    if(!task) throw new OperationalError("Task not found")

    await taskRepository.deleteTask(taskId);
  }
};
