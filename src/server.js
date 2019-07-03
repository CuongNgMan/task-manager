import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import * as Router from "./route";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Register router
app.use("/api/v1/tasks", Router.taskRouter);
app.use("/api/v1/users", Router.userRouter);
app.use("/", (req, res) => {
  res.send({ API: "task manager api" });
});
app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

export default app;
