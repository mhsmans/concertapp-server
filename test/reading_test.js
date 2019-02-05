const assert = require("assert");
const Concert = require("../src/concert");

describe("Reading records out of the database", () => {
  beforeEach(done => {
    testConcert = new Concert({ name: "Test concert" });
    testConcert.save().then(() => done());
  });

  it("Finds all concerts with a name of 'Test concert'", done => {
    Concert.find({ name: "Test concert" }).then(concerts => {
      assert(concerts[0]._id.toString() === testConcert._id.toString());
      done();
    });
  });

  it("Find a concert with a particular id", done => {
    Concert.findOne({ _id: testConcert._id }).then(concert => {
      assert(concert.name === "Test concert");
      done();
    });
  });
});
