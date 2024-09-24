import express from 'express';
import type { Request, Response } from 'express';
import { User } from '../../models/index.js';

const router = express.Router();

router.get('/users', async (_req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Error getting users' });
    }
});

export { router as userRoutes };