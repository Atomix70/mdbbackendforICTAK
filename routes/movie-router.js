const express = require('express');
const router = express.Router();
const Movie=require("../models/movie")

// Create a Movie
router.post('/', (req, res) => {
  const { title,director,genre,releaseDate,imageUrl,trailerUrl,cast,description,tags } = req.body;
  const newMovie = new Movie({ title,director,genre,releaseDate,imageUrl,trailerUrl,cast,description,tags });

  newMovie.save()
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Get all Movies
router.get('/', (req, res) => {
  console.log("getting all movies")
  Movie.find()
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Get a single movie
router.get('/:id', (req, res) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (movie) {
        res.send(movie).status(200);
      } else {
        res.status(404).json({ error: 'Movie not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Update a Movie
router.put('/:id', (req, res) => {
  const { title,director,genre,releaseDate,imageUrl,trailerUrl,cast,description,tags } = req.body;

  Movie.findByIdAndUpdate(
    req.params.id,
    { title,director,genre,releaseDate,imageUrl,trailerUrl,cast,description,tags },
    { new: true }
  )
    .then((movie) => {
      if (movie) {
        res.send(movie);
      } else {
        res.status(404).json({ error: 'Movie not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Delete a Movie
router.delete('/:id', (req, res) => {
  Movie.findByIdAndDelete(req.params.id)
    .then((movie) => {
      if (movie) {
        res.json({ message: 'Movie deleted' });
      } else {
        res.status(404).json({ error: 'Movie not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//Search by title
router.get('/search/:word', (req, res) => {
  const word = req.params.word;

  Movie.find({ title: { $regex: word, $options: 'i' } })
    .then((movies) => {
      if (movies.length > 0) {
        res.json(movies);
      } else {
        res.status(404).json({ error: 'No books found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;