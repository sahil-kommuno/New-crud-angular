const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';
require('dotenv').config();

export const jwtAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized: No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const GenerateToken = (userData: any) => {
  return jwt.sign(userData, process.env.JWT_SECRET_KEY as string, { expiresIn: '1h' });
};

module.exports = { jwtAuthMiddleware, GenerateToken };
