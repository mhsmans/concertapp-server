const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  albums: [
    {
      type: Schema.Types.ObjectId,
      ref: "album"
    }
  ],
  name: {
    type: String,
    required: [true, "name is required."]
  }
});

const Artist = mongoose.model("artist", ArtistSchema);
module.exports = Artist;
