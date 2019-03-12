const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required."]
  },
  albums: [
    {
      type: Schema.Types.ObjectId,
      ref: "album"
    }
  ]
});

// Middleware for removing albums.
ArtistSchema.pre("remove", function(next) {
  const Album = mongoose.model("album");
  Album.deleteMany({ _id: { $in: this.albums } }).then(() => next());
});

const Artist = mongoose.model("artist", ArtistSchema);
module.exports = Artist;
