import express from "express";
import authRoute from "../domain/auth/index.js";
import playlistRoute from "../domain/playlist/index.js";
import songRoute from "../domain/song/index.js";
import artistRoute from "../domain/artist/index.js";
import { verifyUer } from "../utils/verifyUser.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use(verifyUer);
router.use("/playlist", playlistRoute);
router.use("/songs", songRoute);
router.use("/artists", artistRoute);
export default router;
