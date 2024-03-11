import { Service } from "typedi";
import TaskRepository from "../repositories/tasks.repository";
import { UpdateTaskEntries } from "../schemas/tasks.schemas";
import ApiError from "../utils/errors/errors.base";
import HTTP_RESPONSE_CODES from "../utils/http.codes";

@Service()
class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async getTasks({ user, ...filter }: { user: string }) {
    return await this.taskRepository.getTasks({ user, ...filter });
  }
  async createTask({ user, title }: { user: string; title: string }) {
    return await this.taskRepository.createTask({ user, title });
  }
  async updateTask(taskId: string, update: UpdateTaskEntries["body"]) {
    const task = await this.taskRepository.getTaskById(taskId);

    if (!task)
      throw new ApiError("Task not found", HTTP_RESPONSE_CODES.NOT_FOUND);

    await this.taskRepository.updateTask(taskId, update);
  }
  async deleteTask(taskId: string) {
    const task = await this.taskRepository.getTaskById(taskId);

    if (!task)
      throw new ApiError("Task not found", HTTP_RESPONSE_CODES.NOT_FOUND);

    await this.taskRepository.deleteTask(taskId);
  }
}

export default TaskService;
