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
// TicketSchema.post("save", function(doc, next) {
//   Concert.findOneAndUpdate({_id: })
// });

module.exports = TicketSchema;