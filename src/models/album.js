const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SongSchema = require("../schemas/song");

const AlbumSchema = new Schema({
  title: {
    type: String,
    required: [true, "title is required."]
  },
  songs: [SongSchema]
});

AlbumSchema.virtual("songCount").get(function() {
  return this.songs.length;
});

const Album = mongoose.model("album", AlbumSchema);

module.exports = Album;
