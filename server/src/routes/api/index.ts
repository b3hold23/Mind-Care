import { Router } from 'express';
import { userRoutes } from './user-routes.js';
import { quoteRoutes } from './quote.js';

const router = Router();
router.use('/users', userRoutes);
router.use('/quote', quoteRoutes);
export default router;