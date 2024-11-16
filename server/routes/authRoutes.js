import express from 'express';
import { register, login } from '../controllers/authController.js';
import { getGoogleAuthURL, googleCallback } from '../controllers/authController.js';
const router = express.Router();

// Google OAuth route to get authentication URL
router.get('/google', getGoogleAuthURL);

// Google OAuth callback to handle authorization and save tokens
router.get('/google/callback', googleCallback);




router.post('/register', register);
router.post('/login', login);

export default router;
