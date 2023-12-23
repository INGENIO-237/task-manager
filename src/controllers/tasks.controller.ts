import { Request, Response } from "express";
import {
  CreateTaskInput,
  FilterTasksQuery,
  UpdateTaskEntries,
} from "../schemas/tasks.schemas";
import { TaskService } from "../services/tasks.service";

const taskService = TaskService;

export const TaskController = {
  getTasks: async (
    req: Request<{}, {}, {}, FilterTasksQuery["query"]>,
    res: Response
  ) => {
    const user = res.locals.user;

    const tasks = await taskService.getTasks({ user, ...req.query });

    return res.status(200).json({ tasks });
  },
  createTask: async (
    req: Request<{}, {}, CreateTaskInput["body"]>,
    res: Response
  ) => {
    const user = res.locals.user;

    const createdTask = await taskService.createTask({ user, ...req.body });

    return res.status(201).json({ task: createdTask });
  },
  updateTask: async (
    req: Request<UpdateTaskEntries["params"], {}, UpdateTaskEntries["body"]>,
    res: Response
  ) => {
    await taskService.updateTask(req.params._id, req.body);
    return res.sendStatus(200);
  },
};
