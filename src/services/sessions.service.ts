import { SessionRepository } from "../repositories/sessions.repository";
import {
  CreateSessionInput,
  FilterSessionsQuery,
} from "../schemas/sessions.schemas";
import { signJwt } from "../utils/jwt.utils";
import { UserService } from "./users.service";

const sessionRepository = SessionRepository;

export const SessionService = {
  getSessions: async (filter: FilterSessionsQuery["query"]) => {
    const sessions = await sessionRepository.getSessions(filter);

    return sessions;
  },

  createSession: async (credentials: CreateSessionInput["body"], userAgent: string) => {
    const { email, password } = credentials;

    const user = await UserService.getUserByEmail(email);

    if (!user) throw new Error("Unregistered email address");

    if (!user.comparePassword(password)) throw new Error("Incorrect password");

    const session = await sessionRepository.createSession({user: user._id, userAgent })

    const token = signJwt(session)

    return token
  },
};
