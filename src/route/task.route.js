import express from "express";
import TaskController from "../api/task.controller";

const router = express.Router();

router
  .route("/")
  .get(TaskController.apiGetTasks)
  .post(TaskController.apiAddTask);
router
  .route("/:id")
  .get(TaskController.apiGetTaskByID)
  .put(TaskController.apiUpdateTaskByID)
  .patch(TaskController.apiSoftRemoveTaskByID)
  .delete(TaskController.apiHardRemoveTaskByID);

export default router;
