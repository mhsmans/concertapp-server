const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  price: {
    type: Number,
    required: [true, "price required"]
  },
  concert: {
    type: Schema.Types.ObjectId,
    ref: "concert"
  }
});

module.exports = TicketSchema;