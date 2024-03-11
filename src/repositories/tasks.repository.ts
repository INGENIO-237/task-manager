import { FilterQuery } from "mongoose";
import { Task } from "../models/tasks.model";
import { UpdateTaskEntries } from "../schemas/tasks.schemas";
import { Service } from "typedi";

@Service()
class TaskRepository {
    async getTasks ({ ...filter }) {
    const filters: FilterQuery<any> = filter || {};

    return await Task.find(filters);
  }
  async getTaskById (taskId: string) {
    const task = await Task.findById(taskId);

    return task;
  }
  async createTask ({ user, title }: { user: string; title: string }) {
    return await Task.create({ user, title });
  }
  async updateTask (taskId: string, update: UpdateTaskEntries["body"]) {
    await Task.findByIdAndUpdate(taskId, update);
  }
  async deleteTask (taskId: string) {
    await Task.findByIdAndDelete(taskId)
  }
};

export default TaskRepository