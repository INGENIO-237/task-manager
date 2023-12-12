import { Express, Request, Response } from "express";

const router = (server: Express) => {
  server.get("/healthcheck", (req: Request, res: Response) =>
    res.sendStatus(200)
  );
};

export default router;
