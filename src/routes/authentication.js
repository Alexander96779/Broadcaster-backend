import express from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import AuthenticationController from '../controllers/authenticationController';

const router = express.Router();

router.post('/signup', AuthMiddleware.signup, AuthenticationController.register);

export default router;