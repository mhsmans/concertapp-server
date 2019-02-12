const assert = require("assert");
const Concert = require("../models/concert");

// 'done' derives from mocha library. 

describe("Creating records", () => {
  it("Saves a concert", (done) => {
    const testConcert = new Concert({ name: "Test concert" });
    testConcert.save()
      .then(() => {
        assert(!testConcert.isNew);
        done();
      });
  });
});
