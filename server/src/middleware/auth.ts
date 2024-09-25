import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Extend JwtPayload to include tokens
interface JwtPayload {
  username: string;
  id?: number;
  tokens?: {
    access_token: string;
    refresh_token: string;
  };
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET_KEY || 'mysecretshhh';

    jwt.verify(token, secretKey, (_err, user) => {
      req.user = user as JwtPayload;
      return next();
    });
  } else {
    res.sendStatus(401); // Unauthorized if no token
  }
};

// Middleware to attach Google Calendar tokens if they exist
export const attachGoogleTokens = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.tokens) {
    req.googleTokens = req.user.tokens; // Attach tokens to req.googleTokens
  }
  return next();
};
