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
