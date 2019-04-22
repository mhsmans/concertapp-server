const Artist = require("../models/artist");

module.exports.getArtists = function(req, res) {
  Artist.find({})
    .sort("name")
    .then(artists => {
      res.status(200).send(artists);
    })
    .catch(err => {
      res.status(400).send({ message: "Failed to get artists.", error: err });
    });
};

module.exports.getArtist = function(req, res) {
  Artist.findById(req.params.id)
    .then(artist => {
      res.status(200).send(artist);
    })
    .catch(err => {
      res.status(400).send({ message: "Failed to find artist.", error: err });
    });
};

module.exports.createArtist = function(req, res) {
  if (req.payload.email == "admin@mail.com") {
    const artist = new Artist(req.body);

    artist.save(err => {
      if (err)
        return res
          .status(500)
          .send({ message: "Creating artist failed.", error: err });
      return res.status(200).send({ message: "Artist created!" });
    });
  } else {
    res
      .status(400)
      .send({ message: "You don't have permission to create content." });
  }
};