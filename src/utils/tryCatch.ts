import { NextFunction, Request, Response } from "express";

/**
 * TryCatch wrapper for handling errors
 *
 * @param {Function} handler
 */
const tryCatch =
  (handler: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      return next(error);
    }
  };

export default tryCatch;
