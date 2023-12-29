import { Router } from "express";
import { UserController } from "../controllers/users.controller";
import validateResource from "../middlewares/validateResource";
import { createUseSchema } from "../schemas/users.schemas";
import tryCatch from "../utils/tryCatch";

const UsersRouter = Router();

const userController = UserController;

UsersRouter.get("", tryCatch(userController.getAllUsers));
UsersRouter.post(
  "",
  validateResource(createUseSchema),
  tryCatch(userController.createUser)
);

export default UsersRouter;
