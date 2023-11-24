import { Router } from 'express';
const router = Router();
import { getAllGenres } from '../controllers/genreController';
import authenticationMiddleware from '../middleware/authenticationMiddleware';

router.get('/', authenticationMiddleware, getAllGenres);

export default router;
