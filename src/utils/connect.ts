import mongoose from "mongoose";
import logger from "./logger";
import { dbUri } from "../config/config";

const connectToDb = async () => {
  try {
    await mongoose.connect(dbUri as string);
    logger.info("Successfully connected to DB");
  } catch (error) {
    logger.error("Failed to connect to DB");
    logger.error({ error });
    setTimeout(connectToDb, 5000);
  }
};

export default connectToDb;
