import "reflect-metadata";

import { Router } from "express";
import SessionController from "../controllers/sessions.controller";
import validateResource from "../middlewares/validateResource";
import {
  createSessionSchema,
  filterSessionsSchema,
} from "../schemas/sessions.schemas";
import { requireAccess } from "../middlewares/access";
import tryCatch from "../utils/tryCatch";
import Container from "typedi";

const SessionsRouter = Router();

const sessionController = Container.get(SessionController);

SessionsRouter.get(
  "",
  validateResource(filterSessionsSchema),
  tryCatch(sessionController.getSessions.bind(sessionController))
);
SessionsRouter.post(
  "",
  validateResource(createSessionSchema),
  tryCatch(sessionController.createSession.bind(sessionController))
);
SessionsRouter.post(
  "/terminate",
  requireAccess,
  tryCatch(sessionController.terminateSession.bind(sessionController))
);

export default SessionsRouter;
