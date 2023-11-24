import { Router } from 'express';
const router = Router();
import { register, updateUser, addToFavorites, removeFromFavorites, deregister } from '../controllers/userController';
import authenticationMiddleware from '../middleware/authenticationMiddleware';
import validationMiddleware from '../middleware/validationMiddleware';

router.post('/register', validationMiddleware, register);
router.post('/update', authenticationMiddleware, validationMiddleware, updateUser);
router.post('/favorites/add', authenticationMiddleware, validationMiddleware, addToFavorites);
router.post('/favorites/remove', authenticationMiddleware, validationMiddleware, removeFromFavorites);
router.post('/deregister', authenticationMiddleware, deregister);

export default router;
