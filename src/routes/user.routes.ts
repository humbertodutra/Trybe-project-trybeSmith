import { Router } from 'express';
import UserController from '../controllers/user.controller';
import LoginController from '../controllers/login.controller';

const router = Router();

const userControoler = new UserController();
const newLogin = new LoginController();

router.post('/users', userControoler.createNewUser);
router.post('/login', newLogin.verifyLogin);

export default router;