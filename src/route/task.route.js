import express from "express";
import TaskController from "../api/task.controller";
import { authentication } from "../config/middleware/auth";

const router = express.Router();

router
  .route("/me/:id")
  .get(authentication, TaskController.apiGetTaskByID)
  .put(authentication, TaskController.apiUpdateTaskByID)
  .patch(authentication, TaskController.apiSoftRemoveTaskByID)
  .delete(authentication, TaskController.apiHardRemoveTaskByID);
  
router
  .route("/me")
  .get(authentication, TaskController.apiGetTasks)
  .post(authentication, TaskController.apiAddTask);

// router.route("/").post(authentication, TaskController.apiAddTask);
// .get(authentication, TaskController.apiGetTasks)

export default router;
