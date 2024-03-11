import "reflect-metadata";

import UserController from "../controllers/users.controller";
import { Router } from "express";
import validateResource from "../middlewares/validateResource";
import { createUseSchema } from "../schemas/users.schemas";
import tryCatch from "../utils/tryCatch";
import { requireAccess } from "../middlewares/access";
import Container from "typedi";
import deserializeUser from "../middlewares/deserializeUser";

const userController = Container.get(UserController);

const UsersRouter = Router();

UsersRouter.use(tryCatch(deserializeUser));
UsersRouter.use(requireAccess);

UsersRouter.get("", tryCatch(userController.getUsers.bind(userController)));
UsersRouter.post(
  "",
  validateResource(createUseSchema),
  tryCatch(userController.createUser)
);

export default UsersRouter;
