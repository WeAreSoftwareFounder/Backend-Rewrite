import { Router } from 'express';
const router = Router();
import { getAllDirectors } from '../controllers/directorController';
import authenticationMiddleware from '../middleware/authenticationMiddleware';

router.get('/', authenticationMiddleware, getAllDirectors);

export default router;
