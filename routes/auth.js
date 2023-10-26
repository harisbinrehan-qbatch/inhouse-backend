import express from 'express';

import { SignIn, SignUp, ForgotPassword } from '../controllers/auth';

const router = express.Router();

router.post('/signin', SignIn);
router.post('/signup', SignUp);
router.post('/forgotPassword', ForgotPassword);

export default router;
