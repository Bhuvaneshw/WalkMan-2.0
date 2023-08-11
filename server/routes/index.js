import express from "express";
import userRoute from "../domain/user/index.js";

const router = express.Router();

router.use("/user", userRoute);

export default router;
