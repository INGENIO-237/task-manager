import { Request, Response } from "express";
import SessionService from "../services/sessions.service";
import {
  CreateSessionInput,
  FilterSessionsQuery,
} from "../schemas/sessions.schemas";
import { Service } from "typedi";

@Service()
class SessionController {
  constructor(private sessionService: SessionService) {}

  async getSessions(
    req: Request<{}, {}, {}, FilterSessionsQuery["query"]>,
    res: Response
  ) {
    const sessions = await this.sessionService.getSessions(req.query);

    return res.json({ sessions });
  }

  async createSession(
    req: Request<{}, {}, CreateSessionInput["body"]>,
    res: Response
  ) {
    const { accessToken, refreshToken } =
      await this.sessionService.createSession(
        req.body,
        req.headers["user-agent"] || ""
      );

    return res.status(201).json({ accessToken, refreshToken });
  }

  async terminateSession(req: Request, res: Response) {
    await this.sessionService.terminateSession(res.locals.user);

    return res.sendStatus(200);
  }
}

export default SessionController
