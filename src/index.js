import m from "mongoose";
import TaskDAO from "./DAO/taskDAO";
import UserDAO from "./DAO/userDAO";
import conn, { DB_URI, CONNECT_OPTIONS, SERVER_PORT, DB_NAME } from "./db/conn";

import app from "./server";

//DB connection event hanlder
m.connection.on("connected", () => {
  console.log(`Connected to db ${DB_NAME}`);
});

m.connection.on("error", err => {
  console.log(`Connecting to: ${CONNECTION_STRING}`);
  console.log(`Connecting error ${err}`);
});

process.on("SIGINT", () => {
  m.connection.close(() => {
    console.log(`Connection to ${DB_NAME} closed`);
    process.exit(0);
  });
});

//Connect to DB
conn
  .openUri(DB_URI, CONNECT_OPTIONS)
  .then(async client => {
    await TaskDAO.injectDB(client);
    await UserDAO.injectDB(client);
    app.listen(SERVER_PORT, err => {
      if (err) {
        console.log(`Error while listening on port ${SERVER_PORT}`);
      }
      console.log(`Server listening on port ${SERVER_PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
