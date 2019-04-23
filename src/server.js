const express = require("express");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:8080' | process.env.ALLOW_ORIGIN,
  optionsSuccessStatus: 200,
}

app.set('port', (process.env.PORT | config.env.webPort));
app.set('env', (process.env.ENV | 'development'))

require('./config/mongo.db');
require('./config/passport');

app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(passport.initialize());

routes(app);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401);
    res.json({ message: err.name + ": " + err.message });
  } else if (err) {
    res.status(422)
    .json({ message: "Something went wrong." })
  }
});

module.exports = app;
