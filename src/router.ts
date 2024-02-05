import { Express, Request, Response } from "express";
import UsersRouter from "./routes/users.routes";
import SessionsRouter from "./routes/sessions.routes";
// import TasksRouter from "./routes/tasks.routes";

const router = (server: Express) => {
  server.get("/healthcheck", (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  server.use("/users", UsersRouter);
  server.use("/sessions", SessionsRouter);
//   server.use("/tasks", TasksRouter);
};

export default router;
