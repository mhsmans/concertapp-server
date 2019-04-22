const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Concert = require("../models/concert");

const TicketSchema = new Schema({
  concert: {
    type: Schema.Types.ObjectId,
    ref: "concert"
  }
});

// Middleware for removing one ticket from ticketsLeft in concert object.
TicketSchema.post("save", function() {
  Concert.findByIdAndUpdate(
    this.concert,
    { $inc: { ticketsLeft: -1 } },
    { new: true }
  )
});

module.exports = TicketSchema;
