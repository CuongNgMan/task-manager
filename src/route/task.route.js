import express from "express";
import TaskController from "../api/task.controller";
import UserController from "../api/user.controller";

const router = express.Router();

router.route("/").get();
router.route("/id/:id").get();
router
  .route("/task")
  .post()
  .put()
  .delete();

export default router;
