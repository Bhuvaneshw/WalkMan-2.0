import Song from "./model.js";

export async function getSongInfo(query) {
  const songData = await Song.aggregate([
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
  ]);
  console.log(songData);
  return songData;
}

export async function getUserHomeInfo(token) {
  const genre = await Song.find().distinct("genere");
  const artist = await Song.find().distinct("artist");
  const songs = await Song.find().limit(7);
  return { genre: genre, artist, songs };
}
