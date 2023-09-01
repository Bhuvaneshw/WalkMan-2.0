import mongoose from "mongoose";
mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://hari:hari@cluster0.glxgy.mongodb.net/walkman2?retryWrites=true"
  )
  .then(() => console.log("db connected successfully"));
