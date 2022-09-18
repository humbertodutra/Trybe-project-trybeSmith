import { Router } from 'express';
import ProductController from '../controllers/product.controller';

const router = Router();

const productController = new ProductController();

router.post('/products', productController.createNewProduct);
router.get('/products', productController.getAllProducts);
export default router;