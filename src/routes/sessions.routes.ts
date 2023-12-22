import { Router } from "express";
import { SessionController } from "../controllers/sessions.controller";
import validateResource from "../middlewares/validateResource";
import {
  createSessionSchema,
  filterSessionsSchema,
} from "../schemas/sessions.schemas";
import { requireAccess } from "../middlewares/access";

const SessionsRouter = Router();
const sessionController = SessionController;

SessionsRouter.get(
  "",
  validateResource(filterSessionsSchema),
  sessionController.getSessions
);
SessionsRouter.post(
  "",
  validateResource(createSessionSchema),
  sessionController.createSession
);
SessionsRouter.post(
  "/terminate",
  requireAccess,
  sessionController.terminateSession
);

export default SessionsRouter;
