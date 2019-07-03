import express from "express";
import TaskController from "../api/task.controller";
import UserController from "../api/user.controller";

const router = express.Router();

router.route("/").get(TaskController.getAll);
router.route("/id/:id").get(TaskController.get);
router
  .route("/task")
  .post(TaskController.add)
  .put(TaskController.update)
  .delete(TaskController.remove);

export default router;
