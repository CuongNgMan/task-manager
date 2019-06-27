import express from "express";
import * as Router from "./route";

const app = express();

//Register router
app.use("/api/v1/tasks", Router.taskRouter);
app.use("/api/v1/users", Router.userRouter);

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
