import { Router } from 'express';
const router = Router();
import { getAllMovies, getMovieByTitle, getGenreByName, getDirectorByName, getActorsByMovie, addToFavorites, removeFromFavorites } from '../controllers/movieController';
import authenticationMiddleware from '../middleware/authenticationMiddleware';

router.get('/', authenticationMiddleware, getAllMovies);
router.get('/:title', authenticationMiddleware, getMovieByTitle);
router.get('/genre/:name', authenticationMiddleware, getGenreByName);
router.get('/director/:name', authenticationMiddleware, getDirectorByName);
router.get('/actors/:title', authenticationMiddleware, getActorsByMovie); // New route
router.post('/favorites/add', authenticationMiddleware, authorizationMiddleware, validationMiddleware, addToFavorites);
router.post('/favorites/remove', authenticationMiddleware, authorizationMiddleware, validationMiddleware, removeFromFavorites);

export default router;
