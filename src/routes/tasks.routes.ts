import "reflect-metadata";

import { Router } from "express";
import TaskController from "../controllers/tasks.controller";
import { requireAccess } from "../middlewares/access";
import validateResource from "../middlewares/validateResource";
import {
  createTaskSchema,
  deleteTaskSchema,
  updateTaskSchema,
} from "../schemas/tasks.schemas";
import tryCatch from "../utils/tryCatch";
import Container from "typedi";

const TasksRouter = Router();

const taskController = Container.get(TaskController);

TasksRouter.use(requireAccess);

TasksRouter.get("", tryCatch(taskController.getTasks.bind(taskController)));
TasksRouter.post(
  "",
  validateResource(createTaskSchema),
  tryCatch(taskController.createTask.bind(taskController))
);
TasksRouter.patch(
  "/:_id",
  validateResource(updateTaskSchema),
  tryCatch(taskController.updateTask.bind(taskController))
);
TasksRouter.delete(
  "/:_id",
  validateResource(deleteTaskSchema),
  tryCatch(taskController.deleteTask.bind(taskController))
);

export default TasksRouter;
