import { NextFunction, Request, Response } from "express";
import { BaseError } from "./errors.base";
import { logError } from "./errors.utils";
import HTTP_RESPONSE_CODES from "../http.codes";

const errorHandler = (
  error: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // logError(error);
  if (error.isOperationalError) {
    return res.status(error.statusCode).json([{ message: error.message }]);
  } else {
    res
      .status(HTTP_RESPONSE_CODES.INTERNAL_SERVER)
      .json([{ message: "Something went wrong. Retry later." }]);
    return process.exit(1);
  }
};

export default errorHandler;
