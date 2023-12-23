import { TaskRepository } from "../repositories/tasks.repository";

const taskRepository = TaskRepository;

export const TaskService = {
  getTasks: async ({ user, ...filter }: { user: string }) => {
    return await taskRepository.getTasks({ user, ...filter });
  },
  createTask: async ({ user, title }: { user: string; title: string }) => {
    return await taskRepository.createTask({ user, title });
  },
};
