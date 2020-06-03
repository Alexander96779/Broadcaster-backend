import express from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import AuthenticationController from '../controllers/authenticationController';
import LoginMiddleware from '../middlewares/login.middleware';
import validateEmail from '../middlewares/emailValidation.middleware';
import resetController from '../controllers/resetController';

const router = express.Router();

router.post('/signup', AuthMiddleware.signup, AuthenticationController.register);
router.post('/verification/:emailToken', AuthenticationController.verifyingUsers);
router.post('/login', LoginMiddleware.Validate, AuthenticationController.loginUser);
router.post('/forgotPassword', validateEmail.forget, resetController.forgotPassword);
router.patch('/resetPassword/:email/:password', validateEmail.reset, resetController.resetPassword);
router.get('/logout', AuthMiddleware.verifyToken, AuthenticationController.logout);
router.patch('/changeRole', AuthMiddleware.verifyToken, AuthMiddleware.userRole, AuthenticationController.assignRole);

export default router;