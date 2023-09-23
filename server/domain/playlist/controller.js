import Playlist from "./model.js";

export async function getUserPlaylist(req, res) {
    const userId = req.userId;
    const {songs} = await Playlist.findOne({userId: userId}).populate("songs");
    res.json(songs);
}

export async function postUserPlaylist(req, res) {
    const userId = req.userId;
    const songId = req.body.songId;
    const playlist = await Playlist.findOne({userId: userId});
    if (playlist) {
        if (playlist.songs.includes(songId)) {
            res.json("Already added");
            return;
        }
        playlist.songs.push(songId);
        playlist.save();
        res.json("Added to playlist");
        return;
    }

    const newPlaylist = new Playlist({userId, songs: [songId]});
    newPlaylist.save();
    res.json("new playlist created");
}
