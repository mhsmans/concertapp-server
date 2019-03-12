const mongoose = require("mongoose");
const assert = require("assert");
const Artist = require("../models/artist");
const Album = require("../models/album");

describe("Middleware", () => {
  let artist, album;

  beforeEach(done => {
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

    artist.albums.push(album);

    Promise.all([artist.save(), album.save()]).then(() => done());
  });

  it("Artist clean up albums on remove", done => {
    artist
      .remove()
      .then(() => Album.countDocuments())
      .then(count => {
        assert(count === 0);
        done();
      });
  });
});
