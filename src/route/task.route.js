import express from "express";
import TaskController from "../api/task.controller";
import { authentication } from "../config/middleware/auth";

const router = express.Router();

router
  .route("/me")
  .get(authentication, TaskController.apiGetTaskByID)
  .put(authentication, TaskController.apiUpdateTaskByID)
  .post(authentication, TaskController.apiAddTask)
  .patch(authentication, TaskController.apiSoftRemoveTaskByID)
  .delete(authentication, TaskController.apiHardRemoveTaskByID);

// router.route("/").post(authentication, TaskController.apiAddTask);
// .get(authentication, TaskController.apiGetTasks)

export default router;
