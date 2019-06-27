import express from "express";

const router = express.Router();

router.route("/:id").get();
router.route("/").get();

export default router;
