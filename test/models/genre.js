const mongoose = require('mongoose');

const Schema_genre = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
});

Schema_genre.virtual('url').get(function () {
  return '/genres/' + this._id;
});

module.exports = mongoose.model('Genre', Schema_genre);
