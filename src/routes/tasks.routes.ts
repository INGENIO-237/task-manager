// import { Router } from "express";
// import { TaskController } from "../controllers/tasks.controller";
// import { requireAccess } from "../middlewares/access";
// import validateResource from "../middlewares/validateResource";
// import {
//   createTaskSchema,
//   deleteTaskSchema,
//   updateTaskSchema,
// } from "../schemas/tasks.schemas";
// import tryCatch from "../utils/tryCatch";

// const TasksRouter = Router();
// const taskController = TaskController;

// TasksRouter.use(requireAccess);

// TasksRouter.get("", tryCatch(taskController.getTasks));
// TasksRouter.post(
//   "",
//   validateResource(createTaskSchema),
//   tryCatch(taskController.createTask)
// );
// TasksRouter.patch(
//   "/:_id",
//   validateResource(updateTaskSchema),
//   tryCatch(taskController.updateTask)
// );
// TasksRouter.delete(
//   "/:_id",
//   validateResource(deleteTaskSchema),
//   tryCatch(taskController.deleteTask)
// );

// export default TasksRouter;
