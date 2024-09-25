import { Router } from 'express';
import { googleCalendarRoutes } from './googleCalendar.js';
import { userRoutes } from './user-routes.js';
import { quoteRoutes } from './quote.js';
import { scheduleRoutes } from './schedule-routes.js';  // Ensure schedule routes are included

const router = Router();

router.use('/googleCalendar', googleCalendarRoutes);
router.use('/users', userRoutes);
router.use('/quotes', quoteRoutes);
router.use('/schedules', scheduleRoutes);  // Include schedule routes here

export default router;
