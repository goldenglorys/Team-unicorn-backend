import express from 'express';
const router = express.Router();

import { signUp, signIn } from '../controllers/user.controller';

router.post('/api/v1/auth/signup', signUp);
router.post('/api/v1/auth/signin', signIn);

export default router;

