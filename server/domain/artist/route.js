import express from "express";
import {findArtistInfo, getArtistInfo,} from "./controller.js";

const router = express.Router();

router.get("/find", async (req, res) => {
    const artistInfo = await findArtistInfo(req.headers.token, req.query.name);
    res.json(artistInfo);
});

router.get("/", async (req, res) => {
    const artistInfo = await getArtistInfo(req.headers.token);
    res.json(artistInfo);
});

export default router;
