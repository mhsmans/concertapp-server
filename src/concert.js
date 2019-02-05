const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConcertSchema = new Schema({
    name: String,
});

const Concert = mongoose.model('concert', ConcertSchema);

module.exports = Concert;