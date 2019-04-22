const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required."]
  },
  bio: {
    type: String,
    required: [true, "bio is required."]
  }
});

const Artist = mongoose.model("artist", ArtistSchema);
module.exports = Artist;
