import "reflect-metadata"

import SessionRepository from "../repositories/sessions.repository";
import {
  CreateSessionInput,
  FilterSessionsQuery,
} from "../schemas/sessions.schemas";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import UserService from "./users.service";
import ApiError from "../utils/errors/errors.base";
import HTTP_RESPONSE_CODES from "../utils/http.codes";
import { Inject, Service } from "typedi";

@Service()
class SessionService {
  constructor(
    private sessionRepository: SessionRepository,
    @Inject() private userService: UserService
  ) {}

  async getSessions(filterSet: FilterSessionsQuery["query"]) {
    const sessions = await this.sessionRepository.getSessions(filterSet);

    return sessions;
  }

  async createSession(
    credentials: CreateSessionInput["body"],
    userAgent: string
  ) {
    const { email, password } = credentials;

    const user = await this.userService.getUserByEmail(email);

    // TODO: Invalid any active session

    if (!user)
      throw new ApiError(
        "Unregistered email address",
        HTTP_RESPONSE_CODES.NOT_FOUND
      );

    if (!(await user.comparePassword(password)))
      throw new ApiError("Incorrect password", HTTP_RESPONSE_CODES.BAD_REQUEST);

    const session = await this.sessionRepository.createSession({
      user: user._id,
      userAgent,
    });

    const accessToken = signJwt({ user: user._id });
    const refreshToken = signJwt({ session: session._id }, true);

    return { accessToken, refreshToken };
  }

  async terminateSession(userId: string) {
    const session = await this.sessionRepository.getSession({
      user: userId,
      valid: true,
    });

    if (session) {
      await this.sessionRepository.updateSession(
        { _id: session._id.toString() },
        { valid: false }
      );
    }
  }

  async getSession(filterSet: FilterSessionsQuery["query"]) {
    return await this.sessionRepository.getSession(filterSet);
  }
}

export default SessionService;
