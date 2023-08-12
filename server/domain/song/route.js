import express from "express";
import { getSongInfo } from "./controller.js";
const router = express.Router();

router.get("/:query", async (req, res) => {
  const songs = await getSongInfo(req.params.query);
  res.json(songs);
});

export default router;
