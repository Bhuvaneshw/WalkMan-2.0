import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    artist: {
        type: String,
    },
    genre: {
        type: String,
    },
    year: {
        type: Number,
    },
    duration: {
        type: Number,
    },
    url: {
        type: String,
    },
    icon: {
        type: String,
    },
    likes: {
        type: Number,
    },
    views: {
        type: Number,
    },
    downloads: {
        type: Number,
    },
});

songSchema.index({artist: "text", title: "text", genre: "text"});
const Song = mongoose.model("song", songSchema);

export default Song;
