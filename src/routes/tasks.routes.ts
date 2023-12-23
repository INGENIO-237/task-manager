import { Router } from "express";
import { tryCatch } from "../utils/errors.utils";
import { TaskController } from "../controllers/tasks.controller";
import { requireAccess } from "../middlewares/access";

const TasksRouter = Router();
const taskController = TaskController;

TasksRouter.use(requireAccess);

TasksRouter.get("", tryCatch(taskController.getTasks));

export default TasksRouter;
