const assert = require("assert");
const Concert = require("../models/concert");

describe("Reading records out of the database", () => {
  let testConcert, testConcert2, testConcert3, testConcert4;

  beforeEach(done => {
    testConcert = new Concert({ name: "Test concert A", country: "England" });
    testConcert2 = new Concert({ name: "Test concert B", country: "England" });
    testConcert3 = new Concert({ name: "Test concert C", country: "England" });
    testConcert4 = new Concert({ name: "Test concert D", country: "England" });

    Promise.all([
      testConcert.save(),
      testConcert2.save(),
      testConcert3.save(),
      testConcert4.save()
    ]).then(() => done());
  });

  it("Finds all concerts with a name of 'Test concert'", done => {
    Concert.find({ name: "Test concert A" }).then(concerts => {
      assert(concerts[0]._id.toString() === testConcert._id.toString());
      done();
    });
  });

  it("Find a concert with a particular id", done => {
    Concert.findOne({ _id: testConcert._id }).then(concert => {
      assert(concert.name === "Test concert A");
      done();
    });
  });

  it("Can skip and limit result set", done => {
    Concert.find({}).sort({ name: 1 }).skip(1).limit(2)
      .then((concerts) => {
        assert(concerts.length === 2);
        assert(concerts[0].name === "Test concert B");
        assert(concerts[1].name === "Test concert C");
      });
      done();
  });
});
