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
  date: {
    type: String,
    required: [true, "date is required."]
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "artist",
    required: [true, "artist reference is required."]
  }, 
  image: {
    type: String,
    required: true
  },
  ticketsAvailable: {
    type: Number,
    required: true
  },
  ticketsLeft: {
    type: Number, 
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number
  },
});

const Concert = mongoose.model("concert", ConcertSchema);

module.exports = Concert;
