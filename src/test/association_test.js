const assert = require("assert");

const User = require("../models/user");
const Concert = require("../models/concert");
const Artist = require("../models/artist");

describe("Associations", () => {
  let user, concert, artist;

  beforeEach(done => {
    artist = new Artist({
      name: "RHCP",
      bio: "This bio is very short."
    });

    concert = new Concert({
      name: "RHCP 2019 tour",
      country: "England",
      date: "20-02-2020",
      image: "image url",
      ticketsAvailable: "2000",
      ticketsLeft: "1490",
      description: "Short description",
      price: "30.40"
    });

    user = new User({
      firstName: "Alice",
      lastName: "Alisson",
      email: "alice@test.com",
      password: "superstrongpassword",
      tickets: []
    });

    concert.artist = artist;
    user.tickets.push({ concert: concert._id });

    Promise.all([user.save(), artist.save(), concert.save()]).then(() =>
      done()
    );
  });

  it.only("Saves relation between all model instances", done => {
    User.findOne({ firstName: "Alice" })
      .populate("tickets.concert")
      .then(user => {
        console.log("\n Test user: \n" + user + "\n");
      });
    Artist.findOne({ name: "RHCP" })
      .populate("albums")
      .then(artist => {
        console.log("Test artist: \n" + artist + "\n");
      });
    Concert.findOne({ name: "RHCP 2019 tour" })
      .populate("artist")
      .then(concert => {
        console.log("Test concert: \n" + concert + "\n");
      });
    assert(
      user.tickets[0].concert._id === concert._id &&
        concert.artist.name === "RHCP"
    );
    done();
  });
});
