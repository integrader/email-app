import express from 'express';
import { sendEmails, getEmailStatus } from '../controllers/emailController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/send', authenticate, sendEmails);
router.get('/status', authenticate, getEmailStatus);

export default router;
