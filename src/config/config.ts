import { config } from "dotenv";

config()

// const MONGO_INITDB_ROOT_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
// const MONGO_INITDB_ROOT_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
// const MONGO_HOST = "mongo";
// const MONGO_PORT = "27017";

export const port = process.env.port;
export const saltFactor = process.env.saltFactor;
export const accessTokenTtl = process.env.accessTokenTtl;
export const refreshTokenTtl = process.env.refreshTokenTtl;
export const privateKey = process.env.privateKey;
export const publicKey = process.env.publicKey;
// export const dbUri = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;
export const dbUri = process.env.dbUri;
