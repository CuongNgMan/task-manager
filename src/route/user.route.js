import express from "express";
import UserController from "../api/user.controller";

const router = express.Router();

// router.route("/user/:id").get();
router.route("/").get(UserController.getAllUser);

export default router;
