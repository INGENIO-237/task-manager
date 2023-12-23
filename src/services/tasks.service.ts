import { TaskRepository } from "../repositories/tasks.repository";
import { UpdateTaskEntries } from "../schemas/tasks.schemas";

const taskRepository = TaskRepository;

export const TaskService = {
  getTasks: async ({ user, ...filter }: { user: string }) => {
    return await taskRepository.getTasks({ user, ...filter });
  },
  createTask: async ({ user, title }: { user: string; title: string }) => {
    return await taskRepository.createTask({ user, title });
  },
  updateTask: async (taskId: string, update: UpdateTaskEntries["body"]) => {
    await taskRepository.updateTask(taskId, update);
  },
};
