import Song from "./model.js";
import User from "../auth/model.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export async function likeSong(req, res) {
  console.log(req.body);
  const songId = new mongoose.Types.ObjectId(req.body.songId);
  const user = await User.findById(req.userId);
  //dislike
  if (user.likes.includes(songId)) {
    user.likes = user.likes.filter(function (item) {
      return item !== songId;
    });
  } else {
    //like
    user.likes.push(songId);
  }
  await user.save();
  res.send("change success");
}

export async function searchAutoComplete(req, res) {
  const query = req.query.q;
  let result = [];
  if (!query) return result;
  try {
    const fieldSearches = [
      { field: "title", fuzzyOptions: { maxEdits: 2, prefixLength: 3 } },
      { field: "artist", fuzzyOptions: { maxEdits: 2, prefixLength: 3 } },
      { field: "genre", fuzzyOptions: { maxEdits: 2, prefixLength: 3 } },
      { field: "movie", fuzzyOptions: { maxEdits: 2, prefixLength: 3 } },
    ];

    for (const search of fieldSearches) {
      const { field, fuzzyOptions } = search;

      const queryResult = await Song.aggregate([
        {
          $search: {
            index: "autocomplete_index",
            autocomplete: {
              query: `${query}`,
              path: field,
              fuzzy: fuzzyOptions,
            },
          },
        },
        {
          $limit: 1, // Limit the number of results per field
        },
        {
          $project: {
            _id: 0,
            [field]: 1,
            icon: 1,
          },
        },
      ]);
      if (queryResult !== undefined && queryResult.length > 0) {
        for (const eachRes of queryResult) {
          result.push({
            field: field,
            value: eachRes[field],
            icon: eachRes["icon"],
          });
        }
      }
    }
    res.json(result);
  } catch (e) {
    console.log(e.message);
  }
}

export async function searchSong(req, res) {
  const query = req.query.q;
  const user = await User.findById(req.userId);
  let songData = await Song.aggregate([
    {
      $search: {
        index: "artist_text_title_text_genere_text",
        text: {
          query: query,
          path: {
            wildcard: "*",
          },
        },
      },
    },
    { $limit: 5 },
  ]);
  songData = songData.map((song) => {
    if (user.likes.includes(song._id)) {
      song.liked = true;
      return song;
    }
    song.liked = false;
    return song;
  });
  res.json(songData);
}

export async function getUserHomeInfo(req, res) {
  console.log("came here");
  const user = await User.findById(req.userId);
  const genre = await Song.find().distinct("genre");
  const artist = await Song.find().distinct("artist");
  let songs = await Song.aggregate([
    { $group: { _id: "$artist", song: { $first: "$$ROOT" } } },
    { $limit: 10 },
  ]);
  songs = songs.map(({ song }) => {
    if (user.likes.includes(song._id)) {
      song.liked = true;
      return song;
    }
    song.liked = false;
    return song;
  });
  res.json({ genre, artist, songs });
}

export async function getTopSongs(req, res) {
  const topSongs = await Song.find();
  res.json(topSongs);
}

export async function getAllArtist(req, res) {
  const artist = await Song.find().distinct("artist");
  res.json(artist);
}

export async function getAllGenre(req, res) {
  const genere = await Song.find().distinct("genre");
  res.json(genere);
}

export function serverSong(req, res) {
  const songId = req.params.songId;
  const __filename = fileURLToPath(import.meta.url);

  const __dirname = path.dirname(__filename).replace("\\domain\\song", "");
  const songFilePath = path.join(__dirname, `/static/songs/${songId}`);

  let start = 0;
  if (req.headers.range) {
    start = Number(req.headers.range.replace("bytes=", "").split("-")[0]);
  }

  const chunkSize = 2 * 1024 * 1024; // 2MB

  const end = Math.min(start + chunkSize, fs.statSync(songFilePath).size - 1);

  const stream = fs.createReadStream(songFilePath, { start, end });

  res.writeHead(206, {
    "Content-Range": `bytes ${start}-${end}/${fs.statSync(songFilePath).size}`,
    "Accept-Ranges": "bytes",
    "Content-Length": end - start + 1,
    "Content-Type": "audio/mpeg",
  });

  stream.pipe(res);
}
