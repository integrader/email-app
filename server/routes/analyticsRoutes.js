import express from 'express';
import { getAnalytics } from '../controllers/analyticsController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/data', authenticate, getAnalytics);

export default router;
