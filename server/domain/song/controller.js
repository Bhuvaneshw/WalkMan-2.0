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
    const genre = await Song.find().distinct("genre");
    const artist = await Song.find().distinct("artist");
    const songs = await Song.find().limit(7);
    return {genre: genre, artist, songs};
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
