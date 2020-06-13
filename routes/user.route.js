import express from 'express';
const router = express.Router();

import { signUp, signIn, profile } from '../controllers/user.controller';

router.post('/api/v1/auth/signup', signUp);
router.post('/api/v1/auth/signin', signIn);
//Handle get request for a single user profile details
router.get('/api/v1/auth/profile/:user_id', profile);

export default router;

