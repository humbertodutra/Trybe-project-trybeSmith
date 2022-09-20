import { Router, Request, Response } from 'express';
import ProductController from '../controllers/product.controller';
import orderList from '../controllers/orders.controller';
import jwtAuth from '../auth/jwtVerification';

const router = Router();

const productController = new ProductController();

const oi = (_req: Request, res: Response) => res.status(200).json('oi');

router.post('/products', productController.createNewProduct);
router.get('/products', productController.getAllProducts);
router.get('/orders', orderList);
router.post('/orders', jwtAuth, oi);

export default router;