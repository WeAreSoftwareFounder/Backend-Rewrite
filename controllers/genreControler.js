import { find } from '../models/genreModel';

const genreController = {
  getAllGenres: async (req, res) => {
    try {
      const genres = await find();
      res.json(genres);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default genreController;
