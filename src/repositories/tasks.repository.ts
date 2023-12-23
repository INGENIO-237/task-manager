import { FilterQuery } from "mongoose";
import { Task } from "../models/tasks.model";
import { UpdateTaskEntries } from "../schemas/tasks.schemas";

export const TaskRepository = {
  getTasks: async ({ ...filter }) => {
    const filters: FilterQuery<any> = filter || {};

    return await Task.find(filters);
  },
  createTask: async ({ user, title }: { user: string; title: string }) => {
    return await Task.create({ user, title });
  },
  updateTask: async (
    taskId: string,
    update: UpdateTaskEntries["body"]
  ) => {
    await Task.findByIdAndUpdate(taskId, update);
  },
};
