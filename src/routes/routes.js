const UsersController = require("../controllers/users_controller");
const ConcertsController = require("../controllers/concerts_controller");
const ArtistsController = require("../controllers/artists_controller");
const jwt = require("express-jwt");
const auth = jwt({
  // STORING SECRET IN CODE IS A BAD PRACTICE! In this example application it is fine.
  secret: "MY_SECRET",
  userProperty: "payload"
});

module.exports = app => {

  /**************USER ROUTES**************/
  app.post("/api/register", UsersController.register);
  app.get("/api/profile", auth, UsersController.viewProfile);
  app.post("/api/login", UsersController.login);
  app.post("/api/ticket", auth, UsersController.addTicket);

  /**************CONCERT ROUTES***********/
  app.get("/api/concerts", ConcertsController.getConcerts);
  app.get("/api/concerts/:id", ConcertsController.getConcert);
  app.post("/api/concerts", auth, ConcertsController.createConcert);

  /**************ARTIST ROUTES************/
  app.get("/api/artists", ArtistsController.getArtists);
  app.get("/api/artists/:id", ArtistsController.getArtist);
  app.post("/api/artists", auth, ArtistsController.createArtist);
};
