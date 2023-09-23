import express from "express";
import { getUserPlaylist, postUserPlaylist } from "./controller.js";

const router = express.Router();

router.route("/").get(getUserPlaylist).post(postUserPlaylist);

export default router;
