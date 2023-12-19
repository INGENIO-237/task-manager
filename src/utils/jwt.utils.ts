import jwt, { SignOptions } from "jsonwebtoken";
import { SessionDocument } from "../models/session.model";
import logger from "./logger";
import config from "config";

const PRIVATE_KEY = config.get<string>("privateKey");
const PUBLIC_KEY = config.get<string>("publicKey");
const accessTokenTtl = config.get<string>("accessTokenTtl");
const refreshTokenTtl = config.get<string>("refreshTokenTtl");

export const signJwt = (
  payload: SessionDocument,
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
