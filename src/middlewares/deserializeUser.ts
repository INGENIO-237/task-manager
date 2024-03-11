import { NextFunction, Request, Response } from "express";
import { reIssueAccessToken, verifyJwt } from "../utils/jwt.utils";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../utils/errors/errors.base";
import HTTP_RESPONSE_CODES from "../utils/http.codes";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.authorization?.replace(/^Bearer\s/, "") ?? "";
  const refreshToken = req.headers["x-refresh"] ?? "";

  if (!accessToken) return next();

  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    const { user } = decoded as JwtPayload;

    res.locals.user = user as string;
    return next();
  }
  
  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({
      refreshToken: refreshToken as string,
    });

    if (newAccessToken) res.setHeader("x-access-token", newAccessToken);

    const { decoded, expired } = verifyJwt(newAccessToken as string);

    if (expired) {
      throw new ApiError(
        "Your session has expired",
        HTTP_RESPONSE_CODES.FORBIDDEN
      );
    }

    const { user } = decoded as JwtPayload;

    res.locals.user = user as string;

    return next();
  } else {
    throw new ApiError(
      "Your session has expired",
      HTTP_RESPONSE_CODES.FORBIDDEN
    );
  }
};

export default deserializeUser;
