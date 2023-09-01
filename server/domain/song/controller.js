import Song from "./model.js";
import User from "../user/model.js";
import decryptToken from "../../utils/dercyptToken.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export async function likeSong(token, songId) {
  const userId = decryptToken(token);
  const user = await User.findById(userId);
  console.log(user);
  songId = new mongoose.Types.ObjectId(songId);
  if (user.likes.includes(songId)) {
    user.likes = user.likes.filter(function (item) {
      return item !== songId;
    });
    await user.save();
    return;
  }
  user.likes.push(songId);
  await user.save();
}

export async function searchAutoComplete(query) {
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
          $limit: 5, // Limit the number of results per field
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
    return result;
  } catch (e) {
    console.log(e.messages);
  }
}

export async function getSongInfo(query, token) {
  const userId = decryptToken(token);
  const user = await User.findById(userId);
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
  console.log(songData);
  songData = songData.map((song) => {
    if (user.likes.includes(song._id)) {
      song.liked = true;
      return song;
    }
    song.liked = false;
    return song;
  });
  // console.log(songData);
  return songData;
}

export async function getUserHomeInfo(token) {
  const userId = decryptToken(token);
  const user = await User.findById(userId);
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
  return { genre: genre, artist, songs };
}

export async function getUserTopSongs(token) {
  return Song.find();
}

export async function getUserArtist(token) {
  return Song.find().distinct("artist");
}

export async function getUserGenre(token) {
  return Song.find().distinct("genre");
}

export function serverSong(req, res, next) {
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
