const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConcertSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required."]
  },
  country: {
    type: String,
    required: [true, "country is required."]
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "artist"
  }
});

const Concert = mongoose.model("concert", ConcertSchema);

module.exports = Concert;
