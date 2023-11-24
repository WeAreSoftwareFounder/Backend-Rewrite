const User = require('../models/userModel').default;
const bcrypt = require('bcrypt');

const userController = {
  register: async (req, res) => {
    const { username, password, email, dateOfBirth } = req.body;

    try {
      // Check if the username or email is already in use
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ error: 'Username or email already in use' });
      }

      // Hash the password before saving to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        username,
        password: hashedPassword,
        email,
        dateOfBirth,
      });

      // Save the user to the database
      await newUser.save();

      res.json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateUser: async (req, res) => {
    const { userId, username, password, email, dateOfBirth } = req.body;

    try {
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Update user information
      user.username = username || user.username;
      if (password) {
        // Hash the new password before saving to the database
        user.password = await bcrypt.hash(password, 10);
      }
      user.email = email || user.email;
      user.dateOfBirth = dateOfBirth || user.dateOfBirth;

      // Save the updated user to the database
      await user.save();

      res.json({ message: 'User updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  addToFavorites: async (req, res) => {
    const { userId, movieId } = req.body;

    try {
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if the movie is already in the favorites list
      if (!user.favorites.includes(movieId)) {
        user.favorites.push(movieId);
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
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if the movie is in the favorites list
      const index = user.favorites.indexOf(movieId);
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

  deregister: async (req, res) => {
    const { userId } = req.body;

    try {
      // Find the user by ID and remove from the database
      const user = await User.findByIdAndRemove(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ message: 'User deregistered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = userController;
