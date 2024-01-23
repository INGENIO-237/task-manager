import { Router } from "express";
import { UserController } from "../controllers/users.controller";
import validateResource from "../middlewares/validateResource";
import { createUseSchema } from "../schemas/users.schemas";
import tryCatch from "../utils/tryCatch";
import { requireAccess } from "../middlewares/access";

const UsersRouter = Router();

const userController = UserController;

UsersRouter.get("", requireAccess, tryCatch(userController.getAllUsers));
UsersRouter.post(
  "",
  validateResource(createUseSchema),
  tryCatch(userController.createUser)
);

export default UsersRouter;
