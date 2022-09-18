import { Request, Response } from 'express';
import ProductService from '../services/products.service';

class ProductController {
  constructor(private productService = new ProductService()) {}
  
  public createNewProduct = async (req: Request, res: Response) => {
    const product = req.body;
    const productCreated = await this.productService.createNewProduct(product);
    res.status(201).json(productCreated);
  };
}

export default ProductController;