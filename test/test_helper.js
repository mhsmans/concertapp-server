const mongoose = require("mongoose");

// Global promise equals ES6 implementation.
mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect("mongodb://localhost/concertapp_test", {
    useNewUrlParser: true,
    useFindAndModify: false
  });
  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("err", error => {
      console.warn("Warning", error);
    });
});

beforeEach(done => {
  mongoose.connection.collections.concerts.drop(() => {
    // Drop is completed.
    done();
  });
});
