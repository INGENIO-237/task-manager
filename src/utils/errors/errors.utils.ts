import { BaseError } from "./errors.base";
import logger from "../logger";

export const logError = (error: BaseError) => {
  logger.info("========START========");
  logger.error(error);
  logger.info("=========END=========");
};
