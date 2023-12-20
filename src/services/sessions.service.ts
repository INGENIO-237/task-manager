import { get } from "lodash";
import { SessionRepository } from "../repositories/sessions.repository";
import {
  CreateSessionInput,
  FilterSessionsQuery,
} from "../schemas/sessions.schemas";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { UserService } from "./users.service";
import { JwtPayload } from "jsonwebtoken";

const sessionRepository = SessionRepository;

export const SessionService = {
  getSessions: async (filterSet: FilterSessionsQuery["query"]) => {
    const sessions = await sessionRepository.getSessions(filterSet);

    return sessions;
  },

  createSession: async (
    credentials: CreateSessionInput["body"],
    userAgent: string
  ) => {
    const { email, password } = credentials;

    const user = await UserService.getUserByEmail(email);

    // TODO: Invalid any active session

    if (!user) throw new Error("Unregistered email address");

    if (!user.comparePassword(password)) throw new Error("Incorrect password");

    const session = await sessionRepository.createSession({
      user: user._id,
      userAgent,
    });

    const accessToken = signJwt({ user: user._id });
    const refreshToken = signJwt({ session: session._id }, true);

    return { accessToken, refreshToken };
  },

  terminateSession: async (accessToken: string) => {
    const { decoded, expired } = verifyJwt(accessToken);
    const userId = get(decoded as JwtPayload, "user") as string;

    if (decoded) {
      const session = await sessionRepository.getSession({
        _id: userId,
        valid: true,
      });

      if (!expired && session) {
        await sessionRepository.terminateSession(session._id.toString());
      }
    }
  },

  getSession: async (filterSet: FilterSessionsQuery["query"]) =>
    await sessionRepository.getSession(filterSet),
};
