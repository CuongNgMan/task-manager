import express from "express";
import UserController from "../api/user.controller";
import { authentication } from "../config/middleware/auth";

const router = express.Router();

router
  .route("/logoutall")
  .post(authentication, UserController.apiLogoutUserAll);

router.route("/logout").post(authentication, UserController.apiLogoutUser);

router.route("/login").post(UserController.apiLoginUser);

router
  .route("/me")
  .get(authentication, (req, res, _next) => {
    res.status(200).send(req.user);
  })
  .put(authentication, UserController.apiUpdateUserProfile)
  .patch(authentication, UserController.apiSoftDeleteUser)
  .delete(authentication, UserController.apiHardDeleteUser);

router
  .route("/")
  .get(authentication, UserController.apiGetAllUser)
  .post(UserController.apiAddUser);

export default router;
