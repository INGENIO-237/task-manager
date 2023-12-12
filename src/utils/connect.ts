import config from "config";
import mongoose from "mongoose";
import logger from "./logger";

const dbUri = config.get<string>("dbUri");

const connectToDb = async () => {
  try {
    await mongoose.connect(dbUri);
    logger.info("Successfully connected to DB");
  } catch (error) {
    logger.error("Failed to connect to DB");
    logger.error({ error });
    setTimeout(connectToDb, 5000);
  }
};

export default connectToDb;
