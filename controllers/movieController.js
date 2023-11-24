import { find, findOne } from '../models/movieModel';
import Actor from '../models/actorModel';
import { findById } from '../models/userModel';

const movieController = {
  getAllMovies: async (req, res) => {
    try {
      const movies = await find();
      res.json(movies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getMovieByTitle: async (req, res) => {
    const { title } = req.params;
    try {
      const movie = await findOne({ title });
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      res.json(movie);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getGenreByName: async (req, res) => {
    const { name } = req.params;
    try {
      const genre = await Genre.findOne({ name });
      if (!genre) {
        return res.status(404).json({ error: 'Genre not found' });
      }
      res.json(genre);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getDirectorByName: async (req, res) => {
    const { name } = req.params;
    try {
      const director = await Director.findOne({ name });
      if (!director) {
        return res.status(404).json({ error: 'Director not found' });
      }
      res.json(director);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getActorsByMovie: async (req, res) => {
    const { title } = req.params;
    try {
      const movie = await findOne({ title }).populate('actors');
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      res.json(movie.actors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  addToFavorites: async (req, res) => {
    const { userId, movieId } = req.body;
    try {
      const user = await findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if the movie is already in the favorites list
      if (!user.favorites.some(favorite => favorite.movie.equals(movieId))) {
        user.favorites.push({ movie: movieId });
        await user.save();
        res.json({ message: 'Movie added to favorites successfully' });
      } else {
        res.status(400).json({ error: 'Movie already in favorites' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  removeFromFavorites: async (req, res) => {
    const { userId, movieId } = req.body;
    try {
      const user = await findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if the movie is in the favorites list
      const index = user.favorites.findIndex(favorite => favorite.movie.equals(movieId));
      if (index !== -1) {
        user.favorites.splice(index, 1);
        await user.save();
        res.json({ message: 'Movie removed from favorites successfully' });
      } else {
        res.status(400).json({ error: 'Movie not in favorites' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default movieController;
