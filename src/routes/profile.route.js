import express from 'express';
import connect from 'connect-multiparty';
import UserProfile from '../controllers/user.profile.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import ProfileMiddleware from '../middlewares/profile.middleware';

const router = express.Router();

const connection = connect();

router.get('/', AuthMiddleware.verifyToken, UserProfile.getProfile);
router.patch('/', AuthMiddleware.verifyToken, connection, ProfileMiddleware.validate, UserProfile.updateUser);

export default router;