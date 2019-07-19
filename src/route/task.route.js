import express from "express";
import TaskController from "../api/task.controller";

const router = express.Router();

router.route("/").get(TaskController.apiGetTasks);
router.route("/task/:id").get(TaskController.apiGetTaskByID);

router
  .route("/task")
  .post(TaskController.apiAddTask)
  .put(TaskController.apiUpdateTaskByID)
  .delete(TaskController.apiRemoveTaskByID);

export default router;
