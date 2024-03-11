import connectToDb from "./utils/connect";
import logger from "./utils/logger";
import createServer from "./utils/server.utils";
import { port } from "./config/config";

(async () => await connectToDb())();

const server = createServer();

server.listen(port, () => logger.info(`Server running on ${port}`));
