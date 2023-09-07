import Artist from "./model.js";

export async function getArtistInfo(token) {
    return Artist.find();
}

export async function findArtistInfo(token, name) {
    return Artist.findOne({
        'name': name
    });
}