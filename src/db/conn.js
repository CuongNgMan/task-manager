import m from "mongoose";

export const DB_NAME = process.env.__DB_NAME__ || "task-manager-api";
export const DB_PORT = process.env.__DB_PORT__ || "27017";

export const DB_URI =
  process.env.__URI__ || `mongodb://127.0.0.1:${DB_PORT}/${DB_NAME}`;

export const CONNECT_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: false,
  reconnectTries: Number.MAX_VALUE,
  useFindAndModify: false
};
export const SERVER_PORT = process.env.__SRV_PORT__ || 3000;

const conn = m.createConnection();

export default conn;
