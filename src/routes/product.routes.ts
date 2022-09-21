import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import { orderList, createController } from '../controllers/orders.controller';
import jwtAuth from '../auth/jwtVerification';

const router = Router();

const productController = new ProductController();

router.post('/products', productController.createNewProduct);
router.get('/products', productController.getAllProducts);
router.get('/orders', orderList);
router.post('/orders', jwtAuth, createController);

export default router;