import express from "express";
import userRoute from "../domain/user/index.js";
import songRoute from "../domain/song/index.js";

const router = express.Router();

router.use("/user", userRoute);
router.use("/song", songRoute);
export default router;
