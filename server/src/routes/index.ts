import { Router } from 'express';
import { router as authRoutes} from './auth-routes.js';
// TODO: uncomment and add apiRoutes ('/api', authenticateToken, apiRoutes)
// import apiRoutes from './api/index.js'; 
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/api', authenticateToken);

export default router;

