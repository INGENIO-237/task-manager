import express from "express";
import logger from "./utils/logger";
import router from "./router";
import connectToDb from "./utils/connect";
import deserializeUser from "./middlewares/deserializeUser";
import tryCatch from "./utils/tryCatch";
import errorHandler from "./utils/errors/errors.handler";

const server = express();
const port = 1337;

(async () => connectToDb())();

server.use(express.json());

server.use(tryCatch(deserializeUser))

router(server);

server.use(errorHandler)

server.listen(port, () => logger.info(`Server running on ${port}`));
