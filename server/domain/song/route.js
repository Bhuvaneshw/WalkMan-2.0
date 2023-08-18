import express from "express";
import {getSongInfo, getUserArtist, getUserGenre, getUserHomeInfo, getUserTopSongs} from "./controller.js";
const router = express.Router();

router.get("/home", async (req, res) => {
  const userHomeInfo = await getUserHomeInfo();
  res.json(userHomeInfo);
});

router.get("/top", async (req, res) => {
  const userHomeInfo = await getUserTopSongs();
  res.json(userHomeInfo);
});

router.get("/artist", async (req, res) => {
  const userHomeInfo = await getUserArtist();
  res.json(userHomeInfo);
});

router.get("/genre", async (req, res) => {
  const userHomeInfo = await getUserGenre();
  res.json(userHomeInfo);
});

router.get("/", async (req, res) => {
  const songs = await getSongInfo(req.query.q);
  res.json(songs);
});

export default router;
