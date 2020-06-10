import express from 'express';
const router = express.Router();

import signUp from '../controllers/user.controller';

router.post('/api/v1/auth/signup', signUp);

export default router;

