import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController {
  constructor(private userService = new UserService()) {}

  public createNewProduct = async (req: Request, res: Response) => {
    const newUser = req.body;
    const createNewUser = await this.userService.createNewUser(newUser);
    res.status(201).json(createNewUser);
  };
}

export default UserController;