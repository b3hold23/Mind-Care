import { Router, type Request, type Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        where: { email },
    });
    if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    
    const secretKey = process.env.JWT_SECRET_KEY || '';

    const token = jwt.sign({ email, id: user.id }, secretKey, { expiresIn: '1h'});
    return res.json({ token })
};

export const router = Router();

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        const secretKey = process.env.JWT_SECRET_KEY || '';

        const token = jwt.sign({ email, id: user.id }, secretKey, { expiresIn: '1h'});
        return res.json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Error registering user' });
    }
}

router.post('/login', login);
router.post('/register', register);


