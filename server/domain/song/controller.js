import Song from "./model.js";

export async function getSongInfo(query) {
  const songData = await Song.find({ $text: { $search: query } });
  return songData;
}
