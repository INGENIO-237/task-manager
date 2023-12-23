import { Router } from "express";
import { tryCatch } from "../utils/errors.utils";
import { TaskController } from "../controllers/tasks.controller";
import { requireAccess } from "../middlewares/access";
import validateResource from "../middlewares/validateResource";
import { createTaskSchema } from "../schemas/tasks.schemas";

const TasksRouter = Router();
const taskController = TaskController;

TasksRouter.use(requireAccess);

TasksRouter.get("", tryCatch(taskController.getTasks));
TasksRouter.post("", validateResource(createTaskSchema), tryCatch(taskController.createTask));

export default TasksRouter;
