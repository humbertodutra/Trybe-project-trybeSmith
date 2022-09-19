import { Request, Response } from 'express';
import Product from '../interfaces/product.interface';
import ProductService from '../services/products.service';

class ProductController {
  constructor(private productService = new ProductService()) {}
  
  public createNewProduct = async (req: Request, res: Response) => {
    const product = req.body;
    const { name, amount } = product;
    
    if (!name) return res.status(400).json({ message: '"name" is required' });
    if (!amount) return res.status(400).json({ message: '"amount" is required' });
    
    const verifyOtherFields = await this.verifyProductFields(product);
  
    if (verifyOtherFields !== null) {
      return res.status(verifyOtherFields.status).json(verifyOtherFields.message);
    }

    const productCreated = await this.productService.createNewProduct(product);
    res.status(201).json(productCreated);
  };

  public getAllProducts = async (_req: Request, res: Response) => {
    const allProducts = await this.productService.getAllProduct();
    return res.status(200).json(allProducts);
  };

  private verifyProductFields = async (product: Product) => {
    const { name, amount } = product;
    if (typeof name !== 'string') {
      return { status: 422, message: { message: '"name" must be a string' } };
    }

    if (name.length < 2) {
      return { status: 422, 
        message: { message: '"name" length must be at least 3 characters long' } };
    }

    if (typeof amount !== 'string') {
      return { status: 422, message: { message: '"amount" must be a string' } };
    }

    if (amount.length < 2) {
      return { status: 422, 
        message: { message: '"amount" length must be at least 3 characters long' } };
    }
    return null;
  };
}

export default ProductController;