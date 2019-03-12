const express = require("express");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

require('./config/mongo.db');
require('./config/passport');

app.use(bodyParser.json());
app.use(passport.initialize());

routes(app);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401);
    res.json({ message: err.name + ": " + err.message });
  }
  res.status(422).json({ message: "Something went wrong." })
});

module.exports = app;
