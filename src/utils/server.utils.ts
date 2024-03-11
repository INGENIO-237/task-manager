import express from "express";
import router from "../router";
import errorHandler from "./errors/errors.handler";
import cors from "cors";

export default function createServer() {
  const server = express();

  server.use(cors());

  server.use(express.json());

  router(server);

  server.use(errorHandler);

  return server;
}
