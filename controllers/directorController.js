import { find } from '../models/directorModel';

const directorController = {
  getAllDirectors: async (req, res) => {
    try {
      const directors = await find();
      res.json(directors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default directorController;
