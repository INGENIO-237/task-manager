import { Express, Request, Response } from "express";
import UsersRouter from "./routes/users.routes";

const router = (server: Express) => {
  server.get("/healthcheck", (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  server.use("/users", UsersRouter);
};

export default router;
