import m from "mongoose";

const URL = process.env.__DB_URL__ || "mongodb://127.0.0.1:27017";
const DB = "task-manager-api";
const CONN = `${URL}/${DB}`;

const OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: false,
  reconnectTries: Number.MAX_VALUE
};

const conn = m.createConnection(CONN, OPTIONS);

export default conn;
