import express from "express";
import logger from "./utils/logger";

const server = express();
const port = 1337;



server.listen(port, () => logger.info(`Server running on ${port}`));
