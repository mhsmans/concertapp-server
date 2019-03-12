const assert = require("assert");

const User = require("../models/user");
const Concert = require("../models/concert");
const Album = require("../models/album");
const Artist = require("../models/artist");
// const Ticket = require("../schemas/ticket");
// const Song = require("../schemas/song");

describe("Associations", () => {
  let user, concert, album, artist;

  beforeEach((done) => {
    user = new User({
      firstName: "Alice",
      lastName: "Alisson",
      email: "alice@test.com",
      password: "superstrongpassword",
      tickets: [
        {
          price: 20.0
        }
      ]
    });

    concert = new Concert({
      name: "RHCP 2019 tour",
      country: "England"
    });

    artist = new Artist({
      name: "RHCP"
    });

    album = new Album({
      title: "Californication",
      songs: [
        {
          title: "Californication"
        },
        {
          title: "By the way"
        }
      ]
    });

    user.tickets[0].concert = concert;
    concert.artist = artist;
    artist.albums.push(album);

    Promise.all([
      user.save(),
      concert.save(),
      artist.save(),
      album.save()
    ]).then(() => done());
  });

  it("Saves relation between all model instances", done => {
    User.findOne({ firstName: "Alice" }).then(user => {
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
    Album.findOne({ title: "Californication" }).then(album => {
      console.log("Test album: \n" + album);
    });
    assert(
      user.tickets[0].concert.name === "RHCP 2019 tour" &&
        concert.artist.name === "RHCP" &&
        artist.albums[0].title === "Californication"
    );
    done();
  });
});
