import express from "express";
import { getSongInfo, getUserHomeInfo } from "./controller.js";
const router = express.Router();

router.get("/home", async (req, res) => {
  const userHomeInfo = await getUserHomeInfo();
  res.json(userHomeInfo);
});

router.get("/", async (req, res) => {
  const songs = await getSongInfo(req.query.q);
  res.json(songs);
});

export default router;
