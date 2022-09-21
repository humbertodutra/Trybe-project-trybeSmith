import { Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt, { SignOptions } from 'jsonwebtoken';
import UserService from '../services/user.service';
import User from '../interfaces/user.interface';

dotenv.config();

class UserController {
  constructor(private userService = new UserService()) {}

  public createNewUser = async (req: Request, res: Response) => {
    const newUser = req.body;

    const userVerification = await this.verifyIndex(newUser);
    if (userVerification !== null) {
      return res.status(userVerification.status).json(userVerification.message);
    }

    const createNewUser = await this.userService.createNewUser(newUser);
    const { id } = createNewUser;

    const secret = 'seusecretdetoken';

    const jwtConfig:SignOptions = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: { userId: id } }, secret, jwtConfig);
    
    res.status(201).json({ token });
  };

  private verifyIndex = async (newUser: User) => {
    const username = await this.usernameVerify(newUser);
    const password = await this.passwordVerify(newUser);
    const level = await this.levelVerify(newUser);
    const classe = await this.classVerify(newUser);

    if (username) return username;
    if (password) return password;
    if (level) return level;
    if (classe) return classe;

    return null;
  };

  private usernameVerify = async (newUser: User) => {
    const { username } = newUser;
    if (!username) return { status: 400, message: { message: '"username" is required' } };
    if (typeof username !== 'string') {
      return { status: 422, message: { message: '"username" must be a string' } };
    }
    if (username.length <= 2) {
      return { status: 422,
        message: { message: '"username" length must be at least 3 characters long' } };
    }
    return null;
  };

  private passwordVerify = async (newUser: User) => {
    const { password } = newUser;
    if (!password) return { status: 400, message: { message: '"password" is required' } };
    if (typeof password !== 'string') { 
      return { status: 422, message: { message: '"password" must be a string' } }; 
    }
    if (password.length < 8) {
      return { status: 422,
        message: { message: '"password" length must be at least 8 characters long' } };
    }
    return null;
  };

  private levelVerify = async (newUser: User) => {
    const { level } = newUser;
    if (level === undefined) return { status: 400, message: { message: '"level" is required' } };
    if (typeof level !== 'number') {
      return { status: 422, message: { message: '"level" must be a number' } };
    }
    if (level === 0) {
      return { status: 422, message: { message: '"level" must be greater than or equal to 1' } };
    }
    return null;
  };

  private classVerify = async (newUser: User) => {
    const { classe } = newUser;
    if (!classe) return { status: 400, message: { message: '"classe" is required' } };
    if (typeof classe !== 'string') {
      return { status: 422, 
        message: { message: '"classe" must be a string' } };
    }
    if (classe.length < 3) {
      return { status: 422,
        message: { message: '"classe" length must be at least 3 characters long' } };
    }
    return null;
  };
}

export default UserController;