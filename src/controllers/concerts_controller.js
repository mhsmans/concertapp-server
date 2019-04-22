const Concert = require("../models/concert");

module.exports.getConcerts = function(req, res) {
  Concert.find({})
    .sort("date")
    .populate("artist")
    .then(concerts => {
      res.status(200).send(concerts);
    })
    .catch(err => {
      res.status(400).send({ message: "Failed to get concerts.", error: err });
    });
};

module.exports.getConcert = function(req, res) {
  Concert.findById(req.params.id)
    .populate("artist")
    .then(concert => {
      res.status(200).send(concert);
    })
    .catch(err => {
      res.status(400).send({ message: "Failed to find concert.", error: err });
    });
};

module.exports.createConcert = function(req, res) {
  const concert = new Concert(req.body);

  concert.save(err => {
    if (err)
      return res
        .status(500)
        .send({ message: "Failed to create concert.", error: err });
    return res.status(200).send({ message: "Concert created!" });
  });
};
