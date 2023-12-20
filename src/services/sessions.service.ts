import { SessionRepository } from "../repositories/sessions.repository";
import {
  CreateSessionInput,
  FilterSessionsQuery,
} from "../schemas/sessions.schemas";
import { signJwt } from "../utils/jwt.utils";
import { UserService } from "./users.service";

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

  getSession: async (filterSet: FilterSessionsQuery["query"]) =>
    await sessionRepository.getSession(filterSet),
};
