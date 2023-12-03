import express from 'express';
import passport from 'passport';

import { SignIn, SignUp, ForgotPassword, VerifyUser } from '../controllers/auth';
import ResetPassword from '../controllers/auth/reset-password';

const router = express.Router();

router.post('/signin', SignIn);

router.post('/signup', SignUp);

router.post('/sendEmail', ForgotPassword);

router.post('/resetPassword', passport.authenticate('jwt', { session:false }) , ResetPassword);

router.post('/verifyUser', passport.authenticate('jwt', { session:false }), VerifyUser);

export default router; 