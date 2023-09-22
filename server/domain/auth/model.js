import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  pass: {
    type: String,
  },
  likes: {
    type: [mongoose.Schema.ObjectId],
  },
  playlist: {
    type: [mongoose.Schema.ObjectId],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
