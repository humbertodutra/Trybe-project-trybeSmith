import { Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt, { SignOptions } from 'jsonwebtoken';
import UserService from '../services/user.service';

dotenv.config();

class UserController {
  constructor(private userService = new UserService()) {}

  public createNewUser = async (req: Request, res: Response) => {
    const newUser = req.body;
    const createNewUser = await this.userService.createNewUser(newUser);
    const { id } = createNewUser;

    const secret = process.env.JWT_SECRET || 'seusecretdetoken';

    const jwtConfig:SignOptions = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: { userId: id } }, secret, jwtConfig);
    
    res.status(201).json({ token });
  };
}

export default UserController;