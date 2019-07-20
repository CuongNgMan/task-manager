import express from "express";
import UserController from "../api/user.controller";

const router = express.Router();

router
  .route("/")
  .get(UserController.apiGetAllUser)
  .post(UserController.apiAddUser);

router
  .route("/:id")
  .get(UserController.apiGetUserById)
  .put(UserController.apiUpdateUserProfile)
  .patch(UserController.apiSoftDeleteUser)
  .delete(UserController.apiHardDeleteUser);

export default router;
