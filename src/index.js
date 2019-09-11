import m from "mongoose";
import config from "./config";
import app from "./server";

connect();

function listen() {
  if (app.get("env") === "test") return;

  const { PORT } = config.APP;

  app.listen(PORT, error => {
    if (error) {
      console.log(`Error while listening on port ${PORT}`);
    }
    console.log(`Server listening on port ${PORT}`);
  });
}

function connect() {
  const { CONNECTION_STRING, CONNECT_OPTIONS } = config.DB;

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
