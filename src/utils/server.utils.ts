import express from "express";
import tryCatch from "./tryCatch";
import deserializeUser from "../middlewares/deserializeUser";
import router from "../router";
import errorHandler from "./errors/errors.handler";
import cors from "cors";

export default function createServer() {
  const server = express();

  server.use(cors());

  server.use(express.json());

  server.use(tryCatch(deserializeUser));

  router(server);

  server.use(errorHandler);

  return server;
}
