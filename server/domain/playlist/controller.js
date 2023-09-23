import Playlist from "./model.js";

export async function getUserPlaylist(req, res) {
  const userId = req.userId;
  const playlist = await Playlist.find({ userId: userId }).populate("songs");
  res.json(playlist);
}

export async function postUserPlaylist(req, res) {
  const userId = req.userId;
  const songId = req.body.songId;
  const playlist = await Playlist.findOne({ userId: userId });
  if (playlist) {
    playlist.songs.push(songId);
    playlist.save();
    res.json("saved successfully");
    return;
  }

  const newPodcast = new Playlist({ userId, songId });
  newPodcast.save();
  res.json("new playlist created");
  return;
}
