const assert = require("assert");
const Concert = require("../models/concert");

describe("Deleting a record", () => {
  let testConcert;

  beforeEach(done => {
    testConcert = new Concert({ name: "Test concert" });
    testConcert.save().then(() => done());
  });

  it("Concert instance remove", done => {
    testConcert
      .remove()
      .then(() => Concert.findOne({ name: "Test concert" }))
      .then(concert => {
        assert(concert === null);
        done();
      });
  });

  it("Concert class remove", done => {
    Concert.deleteMany({ name: "Test concert" })
      .then(() => Concert.findOne({ name: "Test concert" }))
      .then(concert => {
        assert(concert === null);
        done();
      });
  });

  it("Concert class findAndRemove", done => {
    Concert.findOneAndDelete({ name: "Test concert" })
      .then(() => Concert.findOne({ name: "Test concert" }))
      .then(concert => {
        assert(concert === null);
        done();
      });
  });

  it("Concert class findByIdAndRemove", done => {
    Concert.findByIdAndDelete(testConcert._id)
      .then(() => Concert.findOne({ name: "Test concert" }))
      .then(concert => {
        assert(concert === null);
        done();
      });
  });
});
