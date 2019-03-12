const User = require("../models/user");
const mongoose = require("mongoose");
const passport = require("passport");

// module.exports = {
//   create(req, res, next) {
//     const userProps = req.body;

//     User.create(userProps)
//       .then(user => res.send(user))
//       .catch(next);
//   },

//   edit(req, res, next) {
//     const userId = req.params.id;
//     const userProps = req.body;

//     User.findByIdAndUpdate({ _id: userId }, userProps)
//       .then(() => User.findById({ _id: userId }))
//       .then(user => res.send(user))
//       .catch(next);
//   },

//   delete(req, res, next) {
//     const userId = req.params.id;

//     User.findByIdAndRemove({ _id: userId })
//       .then(user => res.status(204).send(user))
//       .catch(next);
//   }
// };

module.exports.register = function(req, res) {
  const userProps = req.body;

  User.findOne({ email: userProps.email }).then(user => {
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
  });
};

module.exports.login = function(req, res) {
  passport.authenticate("local", function(err, user, info) {
    let token;

    // If Passport throws/catches an error
    if (err) {
      console.log('test');
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
      console.log('test');
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
    User.findById(req.payload._id).exec(function(err, user) {
      res.status(200).json(user);
    });
  }
};
