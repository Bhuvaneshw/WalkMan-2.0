import express from "express";
import userRoute from "../domain/user/index.js";
import songRoute from "../domain/song/index.js";
import artistRoute from "../domain/artist/index.js";

const router = express.Router();

router.use("/user", userRoute);
router.use("/songs", songRoute);
router.use("/artists", artistRoute);
export default router;
