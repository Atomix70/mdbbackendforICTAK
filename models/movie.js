const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  genre: { type: String, required: true },
  releaseDate: { type: String, required: true },
  imageUrl: { type: String, required: true },
  trailerUrl: { type: String, required: true },
  cast: { type: [String], required: true },
  description: { type: String, required: true },
  tags: { type: [String], default: [] },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;