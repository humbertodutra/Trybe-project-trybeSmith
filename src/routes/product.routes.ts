import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import orderList from '../controllers/orders.controller';

const router = Router();

const productController = new ProductController();

router.post('/products', productController.createNewProduct);
router.get('/products', productController.getAllProducts);
router.get('/orders', orderList);
export default router;