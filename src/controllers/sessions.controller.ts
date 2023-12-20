import { Request, Response } from "express";
import { SessionService } from "../services/sessions.service";
import {
  CreateSessionInput,
  FilterSessionsQuery,
} from "../schemas/sessions.schemas";

const sessionService = SessionService;

export const SessionController = {
  getSessions: async (
    req: Request<{}, {}, {}, FilterSessionsQuery["query"]>,
    res: Response
  ) => {
    const sessions = await sessionService.getSessions(req.query);

    return res.json({ sessions });
  },

  createSession: async (
    req: Request<{}, {}, CreateSessionInput["body"]>,
    res: Response
  ) => {
    const { accessToken, refreshToken } = await sessionService.createSession(
      req.body,
      req.headers["user-agent"] || ""
    );

    return res.status(201).json({ accessToken, refreshToken });
  },

  // TODO: Terminate user session
  // terminateSession: async ()
};
