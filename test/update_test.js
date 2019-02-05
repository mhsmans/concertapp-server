const assert = require("assert");
const Concert = require("../src/concert");

describe("Updating records", () => {
  let testConcert;

  beforeEach(done => {
    testConcert = new Concert({ name: "Test concert" });
    testConcert.save().then(() => done());
  });

  // Save manual
  it("Concert instance set and save", done => {
    testConcert.set("name", "Some concert");
    assertName(testConcert.save(), done);
  });

  // Saves instantly
  it("A concert instance can update", done => {
    assertName(testConcert.updateOne({ name: "Some concert" }), done);
  });

  it("A concert class can update", done => {
    assertName(
      Concert.updateMany({ name: "Test concert" }, { name: "Some concert" }),
      done
    );
  });

  it("A concert class can update one record", done => {
    assertName(
      Concert.findOneAndUpdate(
        { name: "Test concert" },
        { name: "Some concert" }
      ),
      done
    );
  });

  it("A concert class can find a record with an Id and update", done => {
    assertName(
      Concert.findByIdAndUpdate(testConcert._id, { name: "Some concert" }),
      done
    );
  });

  function assertName(operation, done) {
    operation
      .then(() => Concert.find({}))
      .then(concerts => {
        assert(concerts.length === 1);
        assert(concerts[0].name === "Some concert");
        done();
      });
  }
});
