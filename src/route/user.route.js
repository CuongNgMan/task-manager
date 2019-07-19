import express from "express";
import UserController from "../api/user.controller";

const router = express.Router();

// router.route("/user/:id").get();
router.route("/").get(UserController.apiGetAllUser);
router.route("/user/:id").get(UserController.apiGetUserById);
router
  .route("/user")
  .post(UserController.apiAddUser)
  .put(UserController.apiUpdateUserProfile)
  .delete(UserController.apiRemoveUser);

export default router;
