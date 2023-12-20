import jwt, { SignOptions } from "jsonwebtoken";
import logger from "./logger";
import config from "config";
import { get } from "lodash";
import { SessionService } from "../services/sessions.service";

const PRIVATE_KEY = config.get<string>("privateKey");
const PUBLIC_KEY = config.get<string>("publicKey");
const accessTokenTtl = config.get<string>("accessTokenTtl");
const refreshTokenTtl = config.get<string>("refreshTokenTtl");

export const signJwt = (
  payload: object,
  isRefreshToken = false,
  options?: SignOptions
) => {
  return jwt.sign(payload, PRIVATE_KEY, {
    ...(options && options),
    algorithm: "RS256",
    expiresIn: isRefreshToken ? refreshTokenTtl : accessTokenTtl,
  });
};

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, PUBLIC_KEY);

    return {
      decoded,
      valid: true,
      expired: false,
    };
  } catch (error: any) {
    logger.error(error.message);

    return { expired: true, valid: false, decoded: null };
  }
};

export const reIssueAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const { decoded, expired } = verifyJwt(refreshToken);

  if (expired || !get(decoded, "session")) return false;

  const session = await SessionService.getSession({
    _id: get(decoded, "session"),
  });

  if (!session) return false;

  return signJwt({ user: session.user });
};
