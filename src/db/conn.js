import m from "mongoose";

const DB_NAME = process.env.__DB_NAME__ || "task-manager-api";
const DB_PORT = process.env.__DB_PORT__ || "27017";

const DB_URI = process.env.__URI__ || `mongodb://127.0.0.1:${DB_PORT}`;

export const CONNECTION_STRING = `${DB_URI}/${DB_NAME}`;
export const CONNECT_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: false,
  reconnectTries: Number.MAX_VALUE
};

const conn = m.createConnection();

export default conn;
