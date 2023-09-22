import express from "express";
import {
  getAllGenre,
  getTopSongs,
  getAllArtist,
  getUserHomeInfo,
  likeSong,
  searchAutoComplete,
  searchSong,
  serverSong,
} from "./controller.js";
const router = express.Router();

router.get("/", getUserHomeInfo);

router.get("/top", getTopSongs);

router.get("/artist", getAllArtist);

router.get("/genre", getAllGenre);

router.get("/search", searchSong);

router.get("/search-autocomplete", searchAutoComplete);

router.post("/like", likeSong);

router.get("/:songId", serverSong);

export default router;
