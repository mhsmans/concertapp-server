const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: {
    type: String,
    required: [true, "title is required."]
  }
});

module.exports = SongSchema;
