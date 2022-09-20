import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
  const jwtSecret = process.env.JWT_SECRET || 'minhachavesecreta';

  const token:string = req.headers.authorization || '';

  if (!token) res.status(401).json({ message: 'Token not found' });

  try {
    jwt.verify(token, jwtSecret);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
    throw new Error('401|Invalid token');
  }
};

export default jwtAuth;