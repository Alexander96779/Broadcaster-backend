import express from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import AuthenticationController from '../controllers/authenticationController';

const router = express.Router();

router.post('/signup', AuthMiddleware.signup, AuthenticationController.register);
router.post('/verification/:emailToken', AuthenticationController.verifyUser);

export default router;