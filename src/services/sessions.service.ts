import { SessionRepository } from "../repositories/sessions.repository";
import {
  CreateSessionInput,
  FilterSessionsQuery,
} from "../schemas/sessions.schemas";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { UserService } from "./users.service";
import ApiError from "../utils/errors/errors.base";
import HTTP_RESPONSE_CODES from "../utils/http.codes";
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

    if (!user)
      throw new ApiError(
        "Unregistered email address",
        HTTP_RESPONSE_CODES.NOT_FOUND
      );

    if (!(await user.comparePassword(password)))
      throw new ApiError("Incorrect password", HTTP_RESPONSE_CODES.BAD_REQUEST);

    const session = await sessionRepository.createSession({
      user: user._id,
      userAgent,
    });

    const accessToken = signJwt({ user: user._id });
    const refreshToken = signJwt({ session: session._id }, true);

    return { accessToken, refreshToken };
  },

  terminateSession: async (userId: string) => {
    const session = await sessionRepository.getSession({
      user: userId,
      valid: true,
    });

    if (session) {
      await sessionRepository.updateSession(
        { _id: session._id.toString() },
        { valid: false }
      );
    }
  },

  getSession: async (filterSet: FilterSessionsQuery["query"]) =>
    await sessionRepository.getSession(filterSet),
};
