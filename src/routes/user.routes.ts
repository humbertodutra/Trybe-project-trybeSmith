import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();

const userControoler = new UserController();

router.post('/users', userControoler.createNewProduct);
export default router;