import express from "express";
import {
  getSongInfo,
  getUserArtist,
  getUserGenre,
  getUserHomeInfo,
  getUserTopSongs,
  likeSong,
  searchAutoComplete,
  serverSong,
} from "./controller.js";
const router = express.Router();

router.get("/home", async (req, res) => {
  const userHomeInfo = await getUserHomeInfo(req.headers.token);
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

router.get("/search", async (req, res) => {
  const songs = await getSongInfo(req.query.q, req.headers.token);
  res.json(songs);
});

router.get("/search-autocomplete", async (req, res) => {
  const songs = await searchAutoComplete(req.query.q);
  res.json(songs);
});

router.post("/likeSong", async (req, res) => {
  await likeSong(req.body.token, req.body.songId);
  res.send();
});

router.get("/:songId", serverSong);

export default router;
