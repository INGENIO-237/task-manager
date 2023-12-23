import { Request, Response } from "express";
import { FilterTasksQuery } from "../schemas/tasks.schemas";
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
};
