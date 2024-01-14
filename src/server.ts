import connectToDb from "./utils/connect";
import logger from "./utils/logger";
import createServer from "./utils/server.utils";
import config from "config";

const port = config.get<number>("port");

(async () => connectToDb())();

const server = createServer();

server.listen(port, () => logger.info(`Server running on ${port}`));
