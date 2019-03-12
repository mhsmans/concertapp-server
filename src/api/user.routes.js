const express = require("express");
const routes = express.Router();

// Toevoegen van een user
routes.post("/register", function(req, res) {
  res.contentType("application/json");

  let user = new User(req.body);

  user
    .save()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => res.status(400).json(error));
});
