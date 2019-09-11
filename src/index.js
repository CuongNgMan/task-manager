import m from "mongoose";

import app from "./server";
import { CONFIGURATION } from "./config/index";

connect();

function listen() {
  if (app.get("env") === "test") return;

  const { PORT } = CONFIGURATION.APP;
  app.listen(PORT, error => {
    if (error) {
      console.log(`Error while listening on port ${PORT}`);
    }
    console.log(`Server listening on port ${PORT}`);
  });
}

function connect() {
  console.log("in side connection");
  console.log(CONFIGURATION);
  const { CONNECTION_STRING, CONNECT_OPTIONS } = CONFIGURATION.DB;

  m.connection
    .on("error", error => {
      console.log(`Connecting to: ${CONNECTION_STRING}`);
      console.log(`Connecting error ${error}`);
    })
    .on("disconnected", () => {
      console.log("DB disconnected");
    })
    .once("open", listen);
  return m.connect(CONNECTION_STRING, CONNECT_OPTIONS);
}

process.on("SIGINT", () => {
  m.connection.close(() => {
    console.log(`Connection to DB closed`);
    process.exit(0);
  });
});
