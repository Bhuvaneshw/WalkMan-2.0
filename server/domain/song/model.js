import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  artist: {
    type: String,
  },
  genere: {
    type: String,
  },
  year: {
    type: Number,
  },
  duration: {
    type: Number,
  },
});

songSchema.index({ artist: "text", title: "text", genere: "text" });
const Song = mongoose.model("song", songSchema);

export default Song;
