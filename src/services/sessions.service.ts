import { SessionRepository } from "../repositories/sessions.repository";
import {
  CreateSessionInput,
  FilterSessionsQuery,
} from "../schemas/sessions.schemas";
import { UserService } from "./users.service";

const sessionRepository = SessionRepository;

export const SessionService = {
  getSessions: async (filter: FilterSessionsQuery["query"]) => {
    const sessions = await sessionRepository.getSessions(filter);

    return sessions;
  },

  createSession: async (credentials: CreateSessionInput["body"]) => {
    const { email, password } = credentials;

    const user = await UserService.getUserByEmail(email);

    if (!user) throw new Error("Unregistered email address");

    if (!user.comparePassword(password)) throw new Error("Incorrect password");

    
  },
};
