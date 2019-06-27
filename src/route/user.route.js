import express from "express";

const router = express.Router();

router.route("/user/:id").get();

export default userRoute;
