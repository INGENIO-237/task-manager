import { Request, Response } from "express";
import {
  CreateTaskInput,
  DeleteTaskParams,
  FilterTasksQuery,
  UpdateTaskEntries,
} from "../schemas/tasks.schemas";
import TaskService from "../services/tasks.service";
import { Service } from "typedi";

@Service()
class TaskController {
  constructor(private taskService: TaskService) {}

  async getTasks(
    req: Request<{}, {}, {}, FilterTasksQuery["query"]>,
    res: Response
  ) {
    const user = res.locals.user;

    const tasks = await this.taskService.getTasks({ user, ...req.query });

    return res.status(200).json({ tasks });
  }
  async createTask(
    req: Request<{}, {}, CreateTaskInput["body"]>,
    res: Response
  ) {
    const user = res.locals.user;

    const createdTask = await this.taskService.createTask({
      user,
      ...req.body,
    });

    return res.status(201).json({ task: createdTask });
  }
  async updateTask(
    req: Request<UpdateTaskEntries["params"], {}, UpdateTaskEntries["body"]>,
    res: Response
  ) {
    await this.taskService.updateTask(req.params._id, req.body);
    return res.sendStatus(200);
  }
  async deleteTask(req: Request<DeleteTaskParams["params"]>, res: Response) {
    await this.taskService.deleteTask(req.params._id);

    return res.sendStatus(200);
  }
}

export default TaskController