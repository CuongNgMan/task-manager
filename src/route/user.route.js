import express from "express";
import UserController from "../api/user.controller";

const router = express.Router();

// router.route("/user/:id").get();
router.route("/").get(UserController.getAllUser);
router.route("/user/:id")

router
  .route("/user")
  .post(UserController.addUser)
  .put(UserController.updateUserProfile);

export default router;
