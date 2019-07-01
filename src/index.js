import m from "mongoose";
import app from "./server";

const DB_NAME = "task-manager-api";
const DB_PORT = process.env.__DB_PORT__ || "27017";
const SERV_PORT = process.env.__SRV_PORT__ || "3000";

const URI = process.env.__URI__ || `mongodb://127.0.0.1:${DB_PORT}`;

const CONNECTION_STRING = `${URI}/${DB_NAME}`;
const CONNECT_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: false,
  reconnectTries: Number.MAX_VALUE
};

m.connect(CONNECTION_STRING, CONNECT_OPTIONS)
  .catch(err => {
    console.log(`Connecting to ${DB_NAME}`);
    console.log(`Error: ${err}`)
    console.log(`Connection string: ${CONNECTION_STRING}`);
    process.exit(1);
  })
  .then(() => {
    //setting up express server
    app.listen(SERV_PORT, err => {
      if (err) {
        console.log(`Error while connecting to express on port ${SERV_PORT}`);
        process.exit(2);
      }
      console.log(`Server is listening on port ${SERV_PORT}`);
    });
  });
