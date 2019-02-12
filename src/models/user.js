const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TicketSchema = require("../schemas/ticket");

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "firstName is required."]
  },
  lastName: {
    type: String,
    required: [true, "lastName is required."]
  },
  infix: {
    type: String
  },
  email: {
    type: String,
    required: [true, "email is required."],
    unique: true
  },
  password: {
    type: String,
    required: [true, "password is required."]
  },
  tickets: [TicketSchema]
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
