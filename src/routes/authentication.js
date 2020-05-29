import express from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import AuthenticationController from '../controllers/authenticationController';
import LoginMiddleware from '../middlewares/login.middleware';

const router = express.Router();

router.post('/signup', AuthMiddleware.signup, AuthenticationController.register);
router.post('/verification/:emailToken', AuthenticationController.verifyUser);
router.post('/login', LoginMiddleware.Validate, AuthenticationController.loginUser);

export default router;