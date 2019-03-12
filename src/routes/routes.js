const UsersController = require("../controllers/users_controller");

module.exports = app => {

  /**************USER ROUTES**************/
  app.post("/api/users", UsersController.create);
  app.put('/api/users/:id', UsersController.edit);
  app.delete('/api/users/:id', UsersController.delete);
};
