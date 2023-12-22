import { Router } from "express";
import { SessionController } from "../controllers/sessions.controller";
import validateResource from "../middlewares/validateResource";
import {
  createSessionSchema,
  filterSessionsSchema,
} from "../schemas/sessions.schemas";
import { requireAccess } from "../middlewares/access";
import { tryCatch } from "../utils/errors.utils";

const SessionsRouter = Router();
const sessionController = SessionController;

SessionsRouter.get(
  "",
  validateResource(filterSessionsSchema),
  tryCatch(sessionController.getSessions)
);
SessionsRouter.post(
  "",
  validateResource(createSessionSchema),
  tryCatch(sessionController.createSession)
);
SessionsRouter.post(
  "/terminate",
  requireAccess,
  tryCatch(sessionController.terminateSession)
);

export default SessionsRouter;
