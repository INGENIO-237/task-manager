import "reflect-metadata";

import jwt, { SignOptions } from "jsonwebtoken";
import logger from "./logger";
import { get } from "lodash";
import SessionService from "../services/sessions.service";
import {
  accessTokenTtl,
  privateKey,
  publicKey,
  refreshTokenTtl,
} from "../config/config";

import Container from "typedi";

const sessionService = Container.get(SessionService);

const PRIVATE_KEY = privateKey as string;
const PUBLIC_KEY = publicKey as string;

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

  const session = await sessionService.getSession({
    _id: get(decoded, "session"),
  });

  if (!session) return false;

  return signJwt({ user: session.user });
};
