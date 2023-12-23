import { NextFunction, Request, Response } from "express";
import logger from "./logger";

/**
 * Errors made by the user
 *
 * @export
 * @class OperationalError
 * @extends {Error}
 */
export class OperationalError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OperationalError";
  }
}

/**
 * TryCatch wrapper for handling errors
 *
 * @param {Function} handler
 */
export const tryCatch =
  (handler: Function) => async (req: Request, res: Response, next?: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      logger.info("==================START==================");
      logger.error(error);
      logger.info("===================END===================");
      if (error instanceof OperationalError) {
        return res.status(400).send([{ message: error.message }]);
      }

      return res
        .status(500)
        .send([{ message: "Something went wrong. Retry later." }]);
    }
  };
