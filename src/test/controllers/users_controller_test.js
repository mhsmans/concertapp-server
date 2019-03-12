const assert = require("assert");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../server");

const User = mongoose.model("user");

describe("Users controller", () => {
  it("POST to /api/users creates new user", done => {
    User.countDocuments().then(count => {
      request(app)
        .post("/api/users")
        .send({
          firstName: "Alice",
          lastName: "Alisson",
          email: "Alice@test.com",
          password: "verystrongpassword"
        })
        .end(() => {
          User.countDocuments().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });

  it("PUT to /api/users/:id edites existing user", done => {
    const user = new User({
      firstName: "Alice",
      lastName: "Alisson",
      email: "Alice@test.com",
      password: "verystrongpassword"
    });

    user.save().then(() => {
      request(app)
        .put("/api/users/" + user._id)
        .send({ email: "Alice@gmail.com" })
        .end(() => {
          User.findOne({ firstName: "Alice" }).then(user => {
            assert(user.email === "Alice@gmail.com");
            done();
          });
        });
    });
  });

  it("DELETE to /api/users/:id removes user", done => {
    const user = new User({
      firstName: "Alice",
      lastName: "Alisson",
      email: "Alice@test.com",
      password: "verystrongpassword"
    });

    user.save().then(() => {
      request(app)
        .delete("/api/users/" + user._id)
        .end(() => {
          User.findOne({ firstName: "Alice" }).then(user => {
            assert(user === null);
            done();
          });
        });
    });
  });
});
