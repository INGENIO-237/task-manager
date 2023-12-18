import express from "express";
import logger from "./utils/logger";
import router from "./router";
import connectToDb from "./utils/connect";

const server = express();
const port = 1337;

(async () => connectToDb())();

server.use(express.json());

router(server);

server.listen(port, () => logger.info(`Server running on ${port}`));
