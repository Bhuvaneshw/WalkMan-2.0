import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
  }
});

const Artist = mongoose.model("artist", artistSchema);

export default Artist;
