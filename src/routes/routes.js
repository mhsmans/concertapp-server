const UsersController = require("../controllers/users_controller");
const jwt = require("express-jwt");
const auth = jwt({
  secret: "MY_SECRET",
  userProperty: "payload"
});

module.exports = app => {

  /**************USER ROUTES**************/
  app.post("/api/register", UsersController.register);
  app.get("/api/profile", auth, UsersController.viewProfile);
  app.post("/api/login", UsersController.login);
  // app.delete("/api/users/:id", UsersController.delete);

  /**************CONCERT ROUTES***********/
  // app.get("/api/concerts", auth, ctr.read);
};
