import { Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt, { SignOptions } from 'jsonwebtoken';
import LoginService from '../services/login.service';
import LoginInterface from '../interfaces/login.interface';

dotenv.config();

class LoginController {
  constructor(private loginService = new LoginService()) {}

  public verifyLogin = async (req: Request, res: Response) => {
    const loginData = req.body;
    const { password } = loginData;
    const verifyReq = await this.verifyFields(loginData); 
    if (verifyReq !== null) return res.status(verifyReq.status).json(verifyReq.message);
    
    const verifyLogin = await this.loginService.UserLogin(loginData);

    if (verifyLogin.length === 0) {
      return res.status(401).json({ message: 'Username or password invalid' });
    }

    if (verifyLogin[0].password !== password) {
      return res.status(401).json({ message: 'Username or password invalid' });
    }

    const secret = process.env.JWT_SECRET || 'seusecretdetoken';
    const jwtConfig:SignOptions = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    
    const token = jwt.sign({ data: { userId: verifyLogin[0].id } }, secret, jwtConfig);
    res.status(200).json({ token });
  };

  public verifyFields = async (userData: LoginInterface) => {
    const { username, password } = userData;
    if (!username) return { status: 400, message: { message: '"username" is required' } };
    if (!password) return { status: 400, message: { message: '"password" is required' } };
    
    return null;
  };
}
export default LoginController;