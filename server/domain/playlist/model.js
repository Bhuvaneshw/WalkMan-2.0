import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  songs: {
    type: [mongoose.Schema.ObjectId],
    ref: "song",
  },
});

const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;
