import { Router } from "express";
import { SessionController } from "../controllers/sessions.controller";
import validateResource from "../middlewares/validateResource";
import { filterSessionsSchema } from "../schemas/sessions.schemas";

const SessionsRouter = Router();
const sessionController = SessionController;

SessionsRouter.get(
  "",
  validateResource(filterSessionsSchema),
  sessionController.getSessions
);

export default SessionsRouter;
