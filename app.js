import express from 'express';
import { connect } from 'mongoose';
import { json } from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import movieRoutes from './routes/movieRoutes';
import genreRoutes from './routes/genreRoutes';
import directorRoutes from './routes/directorRoutes';
import userRoutes from './routes/userRoutes';

// Load environment variables from .env file
require('dotenv').config();

const app = express();

// Middleware
app.use(json());
app.use(morgan('dev'));
app.use(helmet());

// Connect to MongoDB
connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/movies', movieRoutes);
app.use('/genres', genreRoutes);
app.use('/directors', directorRoutes);
app.use('/users', userRoutes);

// Error handling middleware

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
