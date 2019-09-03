import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import taskRouter from "./route/task.route";
import userRouter from "./route/user.route";
import errorhandler from "errorhandler";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(errorhandler());
}

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

//Register router
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/users", userRouter);

app.use("*", (req, res) => {
  res.status(404).json({
    error: "not found"
  });
});

export default app;
