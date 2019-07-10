import express from "express";
import TaskController from "../api/task.controller";

const router = express.Router();

// router.route("/id/:id").get(TaskController.get);
// router
//   .route("/task")
//   .post(TaskController.add)
//   .put(TaskController.update)
//   .delete(TaskController.remove);
router.route("/").get(TaskController.apiGetTasks);
router.route("/id/:id").get(TaskController.apiGetTaskByID);
router.route("/task").post(TaskController.apiAddTask);

export default router;
