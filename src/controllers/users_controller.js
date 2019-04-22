const User = require("../models/user");
const Concert = require("../models/concert");
const mongoose = require("mongoose");
const passport = require("passport");

module.exports.register = function(req, res) {
  const userProps = req.body;

  User.findOne({ email: userProps.email })
    .then(user => {
      if (user) {
        res.status(400).json({ message: "Email address is already in use." });
      } else {
        const user = new User(userProps);
        user.setPassword(userProps.password);

        user.save(function(err) {
          let token;
          token = user.generateJwt();
          res.status(200).json({
            token: token
          });
        });
      }
    })
    .catch(err => {
      res.status(400).send({ message: "Failed to register user.", error: err });
    });
};

module.exports.login = function(req, res) {
  passport.authenticate("local", function(err, user, info) {
    let token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        token: token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
};

module.exports.viewProfile = function(req, res) {
  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      message: "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User.findById(req.payload._id)
      .populate({
        path: "tickets.concert"
      })
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res
          .status(400)
          .json({ message: "Getting user data failed.", error: err });
      });
  }
};

// NEED TO BLOCK THIS ACTION WHEN TICKETS LEFT IN CONCERT EQUALS 0.

module.exports.addTicket = function(req, res) {
  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      message: "UnauthorizedError: private profile"
    });
  } else if (
    req.body.constructor === Object &&
    Object.keys(req.body).length === 0
  ) {
    res.status(400).json({ message: "No tickets in request body." });
  } else {
    // Otherwise add ticket
    User.findById(req.payload._id).then(user => {
      console.log(user)
      user.tickets.push(req.body);
      user.save();
      res.status(200).json(user);
    });
  }
};
