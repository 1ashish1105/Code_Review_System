import express from 'express';
import { getReview } from '../controllers/ai.controller.js'; // Note: we'll rename the function too

const router = express.Router();

router.post('/get-review', getReview);

export default router;
