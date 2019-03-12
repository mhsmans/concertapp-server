const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TicketSchema = require("../schemas/ticket");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

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
  hash: String,
  salt: String,
  tickets: [TicketSchema]
});

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

UserSchema.methods.validPassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.hash === hash;
};

UserSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000)
    },
    "MY_SECRET"
  );
};

const User = mongoose.model("user", UserSchema);
module.exports = User;
