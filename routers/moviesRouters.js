import express from 'express';
const router = express.Router();
import { index, show, destroy, storeReview } from '../controllers/moviesController.js';

//rotte

router.get('/', index)
router.get('/:id', show)
router.delete('/:id', destroy)
router.post("/reviews", storeReview);

export default router;