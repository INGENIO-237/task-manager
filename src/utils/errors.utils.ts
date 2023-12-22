import { Request, Response } from "express";
import logger from "./logger";

export class OperationalError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OperationalError";
  }
}

export const tryCatch =
  (controller: Function) => async (req: Request, res: Response) => {
    try {
      await controller(req, res);
    } catch (error) {
      logger.info("==================START==================");
      logger.error(error);
      logger.info("==================END==================");
      if (error instanceof OperationalError) {
        return res.status(400).send([{ message: error.message }]);
      }

      return res
        .status(500)
        .send([{ message: "Something went wrong. Retry later." }]);
    }
  };
