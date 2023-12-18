import { Router } from "express";
import { UserController } from "../controllers/users.controller";
import validateResource from "../middlewares/validateResource";
import { createUseSchema } from "../schemas/users.schemas";

const UsersRouter = Router();

const userController = UserController;

UsersRouter.get("", userController.getAllUsers);
UsersRouter.post(
  "",
  validateResource(createUseSchema),
  userController.createUser
);

export default UsersRouter;
